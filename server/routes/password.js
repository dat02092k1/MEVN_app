var User = require("../src/user/userModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const express = require("express");
const router = express.Router();

router.post("/password-reset", async (req, res) => {
    try {
        const user = await User.findOne({ address: req.body.address });

        if (!user)
            return res.status(400).send("user with given email doesn't exist"); 

        const link = `http://localhost:2000/password-reset/${user._id}`;
        const mail = await sendEmail(user.address, "Password reset", link);

        console.log(mail);
        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("reset/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId); 

        if (!user) return res.status(400).send("invalid link or expired");

        user.password = req.body.password;
        await user.save();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

module.exports = router;
