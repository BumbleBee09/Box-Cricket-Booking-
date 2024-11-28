const mongoose = require('mongoose');

// Creatinng a userSchema for the database
const groundSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    city: {
        type : String,
        required : true
    },
    location: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    Ratings: {
        type : Number,
        // required : true
    },
    userRated: {
        type : Number,
        // required : true
    },
    description: {
        type : String,
        required : true
    },
    image: {
        type : String,
        required : true
    },
    dateArray: [
        {
            date: {
                type: String, // Format: YYYY-MM-DD
                required: true
            },
            slots: {
                type: [Number], // Array of 24 slots (0: available, 1: booked)
                default: Array(24).fill(0)
            }
        }
    ],
    bookings : [
        {
            cname : {
                type : String,
                required : true
            },
            cemail : {
                type : String,
                required : true
            },
            cphone : {
                type : Number,
                required : true
            },
            bookingDate: {
                type: Date, // Automatically set to current date
                default: Date.now
            },
            reservedDate: {
                type: String, // The date for which the booking is made
                required: true
            },
            slot: {
                type: Number, // Slot index (0 to 23)
                required: true
            }
        }
    ]

});

groundSchema.methods.addBooking = async function({ cname, cemail, cphone, reservedDate, slot }) {
    try {
        // Find the date entry in the dateArray
        const dateEntry = this.dateArray.find(d => d.date === reservedDate);
        if (!dateEntry) throw new Error(`Date ${reservedDate} not available for booking`);
    
        // Check if the slot is available
        if (dateEntry.slots[slot] === 1) {
            throw new Error(`Slot ${slot} is already booked`);
        }
    
        // Mark the slot as booked (Set the slot to 1)
        dateEntry.slots[slot] = 1;
    
        // Add the booking details to the bookings array
        // Including the date the booking was made
        this.bookings.push({
            cname, 
            cemail, 
            cphone, 
            reservedDate, 
            slot, 
            bookingDate: new Date() // Automatically set the booking date to the current date
        });
    
        // Save the ground document
        await this.save();
        
        return { message: "Booking done successfully", bookings: this.bookings };
    } catch (error) {
        console.log(error);
        throw new Error(error.message || 'Error while adding booking');
    }
};

const Ground = mongoose.model("GROUND", groundSchema);

module.exports = Ground;

