const express = require('express');
const User = require('../models/userSchema');
const Ground = require('../models/groundSchema');
const router = express.Router();
require('../db/conn');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const authenticate = require("../middleware/authenticate");
app.use(cors());

// In your server code
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://http://localhost:5000');
    res.header('Access-Control-Allow-Credentials', true);
    // ...
    next();
  });
  


app.use(express.json());

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

// router.post('/grounds', async (req,res) => {

//     // Destructuring req.body to get the registerig users data
//     const {name,city,location,price,Ratings,userrated,Description,image} = req.body;

//     // if any of the fields is not filled then giving error
//     if(!name || !city || !location || !price || !Ratings || !userrated || !Description || !image){
//         return res.status(422).send(`Please Fill all the details...`);
//     }
//     // addinng data into the database
//     try {

//         // since user doesn't exist in database, adding user into db
//         const ground = new Ground({name,city,location,price,Ratings,userrated,Description,image});
//         await ground.save();

//         res.status(201).send("User successfullly Registered...");
        
//     } catch (error) {
//         console.log(error);
//     }

// });

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
router.post('/bookground', async(req,res) => {

        const {name,email, phone, gid, bdate, arvtime, deptime} = req.body;
            // if any of the fields is not filled then giving error

        if(!name || !email || !phone || !bdate || !arvtime || !deptime || (arvtime === deptime)){
        return res.status(422).send(`Please Fill all the details...`);
         }

try{ 
        const bookingGround = await Ground.findOne({_id : gid});

        if(bookingGround){

            const booking = await bookingGround.addBooking(name, email, phone, bdate, arvtime, deptime);

            await bookingGround.save();

            res.status(201).json({ message: "Customer Booking Done Successfully....."});

        }
        
    } catch (error) {
        console.log(error);
    }

})

// ++++++++++++++++++++++++++++++++++++++++ getting the the Bookings ++++++++++++++++++++++++++++++++++++++
app.get('/booking', async (req, res) => {
    try {
      const { name, email, phone } = req.query;
  
      // Use a MongoDB query to find matching bookings
      const bookings = await Ground.find({
        'bookings': {
          $elemMatch: {
            'cname': name,
            'cemail': email,
            'cphone': phone,
          }
        }
      });
  
      // Return the matching bookings as a JSON response
      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while querying the database." });
    }
  });

module.exports = router;