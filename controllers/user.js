const jwt = require("jsonwebtoken");
const User = require("../models/user")

const asynHandler = require("express-async-handler");

//Generate token  
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
//Register User
const registerUser = asynHandler(async(req, res) => {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all require fields");
    }
    //Password length
    if (password.length < 6) {
        res.status(400);
        throw new Error("password must be up to 6 characters");
    }
    //check if user email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Email has already been  register")
    }
});
//create new user 
const user = await User.create({
    name,
    password,
    email
})
const token = generateToken(user._id);
//Generate token and send only cookie 
res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now + 30 * 1000 * 86000),
    sameSite: "none",
    secure: true,
});
if (user) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(201).json({
        _id,
        name,
        email,
        photo,
        phone,
        bio,
        token
    });
} else {
    res.status(400);
    throw new Error("Invalid user data");
}


module.exports = {
    registerUser
}