const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const Course = new Schema({
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
    instructor: { type: Schema.Types.ObjectId, ref: "Users" }, // Refers to the instructor 
    category: {
        type: String
    },
    lessons: {
        type: Number, // Total number of lessons
    },
});

module.exports = mongoose.model("Course", Course);
