const express = require("express");
const router = express.Router();

const Flat = require("../models/Flat");

router.get("/", async (req, res) => {
    try {

        const flats = await Flat.find();

        res.json(flats);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

module.exports = router;