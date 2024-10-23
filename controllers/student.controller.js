const User = require('../models/user.model');
const Course = require('../models/course.model');

// POST /courses/:courseId/enroll - Enroll in a course
const enrollInCourse = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.user.id; // Assuming authenticated user
  
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found.' });
      }
  
      const student = await User.findById(studentId);
      if (student.enrolledCourses.includes(courseId)) {
        return res.status(400).json({ message: 'Already enrolled in this course.' });
      }
  
      student.enrolledCourses.push(courseId);
      student.progress.push({ courseId, completedLessons: 0 });
  
      await student.save();
      res.status(200).json({ message: 'Enrolled in course successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };

// GET /students/:studentId/courses - View enrolled courses
const viewEnrolledCourses = async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const student = await User.findById(studentId).populate('enrolledCourses');
      if (!student) {
        return res.status(404).json({ message: 'Student not found.' });
      }
  
      res.status(200).json(student.enrolledCourses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
  
  // GET /students/:studentId/courses/:courseId/progress - Track progress in a course
  const trackCourseProgress = async (req, res) => {
    const { studentId, courseId } = req.params;
  
    try {
      const student = await User.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: 'Student not found.' });
      }
  
      const progress = student.progress.find((p) => p.courseId.toString() === courseId);
      if (!progress) {
        return res.status(404).json({ message: 'Progress not found for this course.' });
      }
  
      res.status(200).json({ courseId, completedLessons: progress.completedLessons });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
  
  module.exports = {
    enrollInCourse,
    viewEnrolledCourses,
    trackCourseProgress,
  };