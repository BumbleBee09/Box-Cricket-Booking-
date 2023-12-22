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
        required : true
    },
    userrated: {
        type : Number,
        required : true
    },
    Description: {
        type : String,
        required : true
    },
    image: {
        type : String,
        required : true
    },
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
            bdate : {
                type : Date,
                required : true
            },
            date : {
                type : Date,
                default : Date.now
            },
            arvtime : {
                type : Number,
                required : true
            },
            deptime : {
                type : Number,
                required : true
            }
        }
    ]

});

groundSchema.methods.addBooking = async function(cname, cemail, cphone, bdate, arvtime, deptime){
    try {

        this.bookings = this.bookings.concat({cname, cemail, cphone, bdate, arvtime, deptime});
        await this.save();
        return this.bookings;


    } catch (error) {
        console.log(error)
    }
}

const Ground = mongoose.model("GROUND", groundSchema);

module.exports = Ground;

