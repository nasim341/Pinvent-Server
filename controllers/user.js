const User = require("../models/user")

const asynHandler = require("express-async-handler");

//Register User
const registerUser = asynHandler(async(req, res) => {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill i all require fields");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("password must be up to 6 characters");
    }
})


module.exports = {
    registerUser
}