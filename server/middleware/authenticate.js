const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authenticate = async(req,res,next) => {
    // console.log("Cookies are got");
    // console.log(req.cookies);
    try {
        const token = req.cookies.token;
        const verifyToken = jwt.verify(token, process.env.JWT_TOKEN);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token});

        if(!rootUser) {
            throw new Error("User not found");
        }
        req.rootUser = rootUser;
        next();

    } catch (error) {
        res.status(401).send("Unauthorized: No token Provided");
        console.log(error);
    }
}

module.exports = authenticate;