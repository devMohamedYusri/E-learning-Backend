const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const studentController = require("../controllers/student.controller");

// POST /courses/:courseId/enroll - Enroll in a course
router.post(
  "/courses/:courseId/enroll",
  auth,
  role("student"),
  studentController.enrollInCourse
);

// GET /students/:studentId/courses - View enrolled courses
router.get(
  "/students/:studentId/courses",
  auth,
  studentController.viewEnrolledCourses
);

// GET /students/:studentId/courses/:courseId/progress - Track progress in a course
router.get(
  "/students/:studentId/courses/:courseId/progress",
  auth,
  role("instructor"),
  studentController.trackCourseProgress
);

module.exports = router;
