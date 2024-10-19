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
//   enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }], // For students
//   createdCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }], // For instructors
});

module.exports = mongoose.model("Users", Users);
