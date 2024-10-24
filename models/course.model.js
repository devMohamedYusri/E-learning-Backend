const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const lessonSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
});

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
    thumbnailUrl: {
        type: String, // URL for the course thumbnail
      },
      lessons: [lessonSchema], // Array of lessons
});

module.exports = mongoose.model("Course", Course);
