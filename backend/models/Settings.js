const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({

    secretaryName: {
        type: String,
        default: ""
    },

    secretaryEmail: {
        type: String,
        default: ""
    },

    secretaryPhone: {
        type: String,
        default: ""
    },

    societyName: {
        type: String,
        default: ""
    },

    societyAddress: {
        type: String,
        default: ""
    },

    profileImage: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model("Settings", settingsSchema);