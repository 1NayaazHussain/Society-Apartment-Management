const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Flat = require("../models/Flat");
const Resident = require("../models/Resident");


// Signup
router.post("/signup", async (req, res) => {
    try {

        const {
            fullName,
            email,
            phone,
            flatNo,
            password
        } = req.body;

        // Check email
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Check flat
        const existingFlat = await User.findOne({ flatNo });

        if (existingFlat) {
            return res.status(400).json({
                message: "Flat already occupied"
            });
        }

        const newUser = new User({
            fullName,
            email,
            phone,
            flatNo,
            password
        });

        await newUser.save();

        const updatedFlat = await Flat.findOneAndUpdate(
            { flatNo },
            { occupied: true },
            { new: true }
        );

        console.log(updatedFlat);

        res.status(201).json({
            message: "Account Created Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
});
router.get("/pending", async (req, res) => {

    try {

        const users = await User.find({
            status: "Pending"
        });

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
// Approve Resident
router.put("/approve/:id", async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: "Approved" },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Create a Resident record upon approval
        const newResident = new Resident({
            name: user.fullName,
            flatNo: user.flatNo,
            phone: user.phone,
            email: user.email,
            status: "Active"
        });
        await newResident.save();

        res.json({
            message: "Resident approved successfully",
            user,
            resident: newResident
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
// Reject Resident
router.put("/reject/:id", async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: "Rejected" },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await Flat.findOneAndUpdate(
            { flatNo: user.flatNo },
            { occupied: false }
        );

        res.json({
            message: "Resident rejected successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
// Login
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

if (user.status === "Pending") {
    return res.status(400).json({
        success: false,
        message: "Your account is waiting for approval."
    });
}

if (user.status === "Rejected") {
    return res.status(400).json({
        success: false,
        message: "Your registration request has been rejected by the society administrator. Contact society Secretary"
    });
}

        res.json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});
module.exports = router;