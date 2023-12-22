const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Creatinng a userSchema for the database
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    phone: {
        type : Number,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    cpassword: {
        type : String,
        required : true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
});

// Hashing the Password

userSchema.pre('save', async function(next) {

    if(this.isModified('password')){

        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);

        next();
    }
});

userSchema.methods.generateAuthToken = async function(){
    try {
        
        let token = jwt.sign({ _id : this._id} , process.env.JWT_TOKEN);
        this.tokens = this.tokens.concat({ token : token });
        await this.save();
        return token;

    } catch (error) {
        console.log(error)
    }
}

// creating a User model or class and exporting it for the later use of CRUD operations.
const User = mongoose.model("USER", userSchema);

module.exports = User;