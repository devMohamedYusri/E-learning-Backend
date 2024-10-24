const coursesController = require("../controllers/course.controller.js");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const upload = require("../middleware/upload"); // Multer middleware
const express = require("express");
const router = express.Router();

router.get("/All", coursesController.getAllCourses);
router.get("/course/:id", coursesController.getCourse);
router.post(
  "/add",
  auth,
  role("instructor"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 }, // Course thumbnail
    { name: "lesson_0_video", maxCount: 1 }, // First lesson video
    { name: "lesson_1_video", maxCount: 1 }, // Second lesson video, and so on
  ]),
  coursesController.addCourse
);
router.put(
  "/update/:id",
  auth,
  role("instructor"),
  coursesController.updateCourse
);
router.delete(
  "/delete/:id",
  auth,
  role("instructor"),
  coursesController.deleteCourse
);

// GET /instructors/:instructorId/courses
router.get(
  "/instructors/:instructorId/courses",
  auth,
  role("instructor"),
  coursesController.getInstructorCourses
);

module.exports = router;
