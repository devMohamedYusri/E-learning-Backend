const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const courses = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rate: {
        type: Number, 
        required: true
    },
    price: {
        type: Number 
    },
    instructorId: {
        type: String,
        required: true
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model("Courses", courses);
