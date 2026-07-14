const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

    residentName:{
        type:String,
        required:true
    },

    flatNo:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    priority:{
        type:String,
        default:"Medium"
    },

    status:{
        type:String,
        default:"Pending"
    },

date:{
    type:String,
    default:() => new Date().toLocaleDateString()
}

},
{
    timestamps:true
});



module.exports = mongoose.model("Complaint", complaintSchema);