const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "this email used before"],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    default: "student",
  },
  enrolledCourses: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Course' 
  }],
  progress: [{
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    completedLessons: { type: Number, default: 0 },
  }]

});

module.exports = mongoose.model("Users", Users);
