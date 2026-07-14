const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum:[
            "General",
            "Maintenance",
            "Emergency",
            "Meeting",
            "Festival"
        ],
        default:"General"
    },

    priority:{
        type:String,
        enum:[
            "Normal",
            "Important",
            "Urgent"
        ],
        default:"Normal"
    },

    postedBy:{
        type:String,
        default:"Admin"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Notice",noticeSchema);