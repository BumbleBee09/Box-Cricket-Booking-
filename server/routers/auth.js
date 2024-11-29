const express = require('express');
const User = require('../models/userSchema');
const Ground = require('../models/groundSchema');
const router = express.Router();
require('../db/conn');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const authenticate = require("../middleware/authenticate");
const moment = require('moment');
const { scheduleCronJobs } = require('../cronjobs'); 
app.use(cors());

// In your server code_
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://http://localhost:5000');
    res.header('Access-Control-Allow-Credentials', true);
    // ...
    next();
  });
  
app.use(express.json());

scheduleCronJobs();
// ++++++++++++++++++++++++++ Routes +++++++++++++++++++++++++++++++++++++
router.get('/grounds', async(req,res) => {

    try {
        const groundExit = await Ground.find();

        return res.status(200).json(groundExit);
    } catch (error) {
        
    }
})

// Get a specific ground by ID
router.get('/grounds/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const groundData = await Ground.findById(id);
      if (!groundData) {
        return res.status(404).json({ error: 'Ground not found' });
      }
      return res.status(200).json(groundData);
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Helper function to generate date array for the next 30 days with 24 slots (0 = available)
const generateDateArray = () => {
  const dateArray = [];
  for (let i = 0; i < 30; i++) {
      const date = new Date();  // Start from today's date
      date.setDate(date.getDate() + i);  // Increment by i days
      const dateString = date.toISOString().split('T')[0];  // Format date as YYYY-MM-DD

      dateArray.push({
          date: dateString,  // Store date
          slots: Array(24).fill(0)  // 24 slots, all initialized to 0 (available)
      });
  }
  return dateArray;
};

router.post('/grounds', async (req, res) => {
  const { name, city, location, price, description, image } = req.body;

  // If any of the required fields are not filled
  if (!name || !city || !location || !price || !description || !image) {
      return res.status(422).send("Please fill all the required details...");
  }

  try {
      // Generate the date array for the next 30 days with 24 slots for each day
      const dateArray = generateDateArray();

      // Create the new ground and add the generated dateArray
      const ground = new Ground({
          name, 
          city, 
          location, 
          price, 
          description, 
          image,
          dateArray,  // Add the generated dateArray
      });

      // Save the new ground to the database
      await ground.save();
      res.status(201).send("Ground successfully registered...");
      
  } catch (error) {
      console.log(error);
      res.status(500).send("Error registering ground.");
  }
});

// ++++++++++++++++++++++++++ REGISTERING THE USER ROUTE ++++++++++++++++++++++++++++++++++++++++
// since dealing with the database usiing async-await, asynce is used in the callback funnction

router.post('/register', async (req,res) => {

    // Destructuring req.body to get the registerig users data
    const {name,email,phone,password,cpassword} = req.body;

    // if any of the fields is not filled then giving error
    if(!name || !email || !phone || !password || !cpassword || (password !== cpassword)){
        return res.status(422).send(`Please Fill all the details...`);
    }

    // addinng data into the database
    try {

        //checking if the user already exits in the database
        const userExist = await User.findOne(
            {
                $or : [{email},{phone}]
            }
        );

        // if exits then giving error
        if(userExist){
            return res.status(422).send(`Data already exist.....`);
        }

        // since user doesn't exist in database, adding user into db
        const user = new User({name,email,phone,password,cpassword});
        await user.save();

        res.status(201).send("User successfullly Registered...");
        
    } catch (error) {
        console.log(error);
    }

});

// ++++++++++++++++++++++++++ LOGGIN THE USER ROUTE ++++++++++++++++++++++++++++++++++++++++
router.post('/login', async (req,res) => {
    try {
    // Destructuring req.body to get the registerig users data
    const {name,email,password} = req.body;

    // if any of the fields is not filled then giving error
    if(!email || !password){
        res.status(422).send(`Please Fill all the details...`);
    }

        //checking if the user already exits in the database
        const userLogin = await User.findOne({email : email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);

            if(!isMatch){
            res.status(422).send(`You're not logged in.....`);
            }
else{
            const token = await userLogin.generateAuthToken();
            // console.log(token); 
            res
            .status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            })
            .json({ success: true, userLogin, token });

        }
        }else{
            res.status(422).send(`You're not logged in.....`);
        }

        
    } catch (error) {
        console.log(error);
    }

});

// ++++++++++++++++++++++++++++++++++++++++ MY PROFILE ++++++++++++++++++++++++++++++++++++++
router.get('/profile', authenticate , async(req,res) => {
    res.send(req.rootUser);
});

// ++++++++++++++++++++++++++++++++++++++++ LOGOUT ++++++++++++++++++++++++++++++++++++++
router.get('/logout', async(req,res) => {
    res.clearCookie('token',{path: '/'}).status(200);
    res.end();
    // res.status(200).send(`Hello Logout`);
})

// ++++++++++++++++++++++++++++++++++++++++ MORE GROUND ++++++++++++++++++++++++++++++++++++++
router.get('/moreground/:id',authenticate,async(req,res) => {
    res.send(req.rootUser);
})

// ++++++++++++++++++++++++++++++++++++++++ BOOK GROUND ++++++++++++++++++++++++++++++++++++++
router.post('/bookground', async (req, res) => {
    const { name, email, phone, gid, reservedDate, slot } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !phone || !reservedDate || slot === undefined) {
        return res.status(422).json({ error: "Please fill all the details" });
    }

    try {
        // Find the ground by its ID
        const ground = await Ground.findById(gid);

        if (!ground) {
            return res.status(404).json({ error: "Ground not found" });
        }

        // Refresh the date array while retaining existing bookings
        ground.refreshDateArray();

        // Add the booking by calling the addBooking method on the ground instance
        const result = await ground.addBooking({
            cname: name,
            cemail: email,
            cphone: phone,
            reservedDate,
            slot
        });

        res.status(201).json(result); // Return the success message and updated bookings

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});



// ++++++++++++++++++++++++++++++++++++++++ getting the the Bookings ++++++++++++++++++++++++++++++++++++++
router.get('/booking', async (req, res) => {
    try {
        const { name, email, phone } = req.query;

        // Convert phone to a number for querying
        const phoneNumber = parseInt(phone, 10);
        
        const grounds = await Ground.find({
          'bookings': {
            $elemMatch: {
              'cname': name,
              'cemail': email,
              'cphone': phoneNumber, // Use number for comparison
            }
          }
        });
        
  
    //   console.log('Found Grounds:', grounds); // Log found grounds
  
      // Flatten bookings and check the structure of the data
      const matchingBookings = grounds.flatMap(ground =>
        ground.bookings
          .filter(booking => {
            return booking.cname === name &&
                   booking.cemail === email &&
                   booking.cphone === parseInt(phone, 10); // Convert phone to number for comparison
          })
          .map(booking => ({
            groundName: ground.name,
            bdate: booking.bdate,
            timing: `${booking.arvtime} - ${booking.deptime}`,
          }))
      );
      
      
    //   console.log('Matching Bookings:', matchingBookings);
  
      res.json(matchingBookings);
    } catch (error) {
      console.error('Error while querying the database:', error);
      res.status(500).json({ error: "An error occurred while querying the database." });
    }
  });
  
  
  
  

module.exports = router;