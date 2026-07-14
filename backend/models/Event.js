const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true
    },

    date:{
        type:Date,
        required:true
    },

    startTime:{
        type:String,
        required:true
    },

    endTime:{
        type:String,
        required:true
    },

    venue:{
        type:String,
        required:true,
        trim:true
    },

    organizer:{
        type:String,
        required:true,
        trim:true
    },

    guestName:{
        type:String,
        default:"Not Announced"
    },

    eventImage:{
        type:String,
        default:""
    },

    category:{
        type:String,
        default:"General"
    },

    duration:{
        type:String,
        default:""
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    status:{
        type:String,
        enum:[
            "Upcoming",
            "Completed",
            "Postponed",
            "Cancelled"
        ],
        default:"Upcoming"
    },

    createdBy:{
        type:String,
        default:"Admin"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model("Event", eventSchema);