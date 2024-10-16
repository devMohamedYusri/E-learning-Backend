const coursesController=require("../controllers/course.controller.js");
const express=require("express");
const router=express.Router();

router.get("/All",coursesController.getAllCourses);
router.get("/course/:id",coursesController.getCourse);
router.post("/add",coursesController.addCourse);
router.put("/update/:id",coursesController.updateCourse);
router.delete("/delete/:id",coursesController.deleteCourse);

module.exports=router;