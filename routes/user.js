const express = require("express");
const router = express.Router();

const { registerUser, loginUser, logout, getUser } = require("../controllers/user")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logout)
router.post("/getUser", getUser)
    //router.post("/logout", logout)
module.exports = router;