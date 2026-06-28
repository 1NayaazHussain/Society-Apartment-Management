const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    flatNo: String,
    occupied: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Flat", flatSchema);