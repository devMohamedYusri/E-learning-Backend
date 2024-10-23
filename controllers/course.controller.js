const {addCourse,getAll,getCourseById,updateById,deleteById} = require("../repositories/course.repository");
const Course = require("../models/course.model");

class coursesController {
  constructor() {}
  
  async getAllCourses(req, res) {
    const courses = await getAll();
    if (courses != -1) {
      res.json(courses);
    } else {
      res.json("no courses found");
    }
  }

  // Add a new course (Instructor-specific)
  async addCourse (req, res) {
  try {
    const { name, description, rate, price, category, lessons} = req.body;
    const instructorId = req.user.id; // Extracted from JWT token (middleware)

    // Check if a course with the same name exists
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course with this name already exists.' });
    }

    // Create a new course and associate it with the instructor
    const newCourse = new Course({
      name,
      description,
      rate,
      price,
      category,
      instructor: instructorId, // Add instructor's ID from token
      lessons
    });

    // Save the course
    await newCourse.save();

    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

  async getCourse(req, res) {
    const id = req.params.id;
    const course = await getCourseById(id);
    if (course != -1) {
      res.json(course);
    } else {
      res.json("course doesn't exist");
    }
  }

async updateCourse(req, res) {
  try {
    const { id } = req.params; // Get the course ID from the URL params
    const updatedCourseData = req.body; // Get the updated course data from the request body

    if (!id || !updatedCourseData) {
      return res.status(400).json({ message: 'Course ID and updated data are required.' });
    }

    // Find the course by ID
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course doesn't exist." });
    }

    // Update the course
    const updatedCourse = await Course.findByIdAndUpdate(id, updatedCourseData, { new: true });

    return res.status(200).json({
      message: 'Course updated successfully.',
      course: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the course.' });
  }
}

  async deleteCourse(req, res) {
    const id = req.params.id;
    const courses = await getAll();
    const exist = courses.find((course) => course.id === id);
    if (exist) {
      await deleteById(id);
      res.json("course deleted successfully");
    } else {
      res.json("course doesn't exist");
    }
  }

  // Fetch instructor's courses
  // GET /instructors/:instructorId/courses
  async getInstructorCourses(req, res) {
    const { instructorId } = req.params;

    // Check if the logged-in user is the same instructor making the request
    if (req.user.id !== instructorId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view these courses." });
    }

    try {
      // Fetch courses for the given instructorId
      const courses = await Course.find({ instructor: instructorId }).populate(
        "instructor",
        "name"
      );

      if (courses.length === 0) {
        return res
          .status(404)
          .json({ message: "No courses found for this instructor." });
      }

      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
}

module.exports = new coursesController(); 