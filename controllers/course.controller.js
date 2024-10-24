const {addCourse,getAll,getCourseById,updateById,deleteById} = require("../repositories/course.repository");
const Course = require("../models/course.model");
const bucket = require('../firebase'); // Firebase storage bucket

class coursesController {
  constructor() {
    this.uploadFileToFirebase = this.uploadFileToFirebase.bind(this);
    this.addCourse = this.addCourse.bind(this);
  }
  
  async getAllCourses(req, res) {
    const courses = await getAll();
    if (courses != -1) {
      res.json(courses);
    } else {
      res.json("no courses found");
    }
  }

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

// Helper function to upload a file to Firebase
async uploadFileToFirebase(file, folderName) {
  const fileName = `${folderName}/${Date.now()}_${file.originalname}`;
  const blob = bucket.file(fileName);

  const stream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (error) => reject(error));
    stream.on('finish', () => {
      // Get public URL for the uploaded file
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      resolve(publicUrl);
    });
    stream.end(file.buffer);
  });
}

async addCourse(req, res) {
  const { name, description, rate, price, category } = req.body;
  const instructorId = req.user.id; // Get instructor ID from logged-in user

  try {
    // console.log(req.body); 
    // console.log(req.files);

    // Manually construct the lessons array from the request body
    const lessons = [];
    let i = 0;
    while (req.body[`lessons[${i}].title`]) {
      lessons.push({
        title: req.body[`lessons[${i}].title`],
      });
      i++;
    }

    if (lessons.length === 0) {
      return res.status(400).json({ message: 'Lessons should be provided' });
    }

    // Upload course thumbnail to Firebase
    const thumbnailUrl = await this.uploadFileToFirebase(req.files.thumbnail[0], 'course-thumbnails');

    // Upload lessons videos to Firebase
    const lessonArray = [];
    for (let j = 0; j < lessons.length; j++) {
      if (req.files[`lesson_${j}_video`]) {
        const videoUrl = await this.uploadFileToFirebase(req.files[`lesson_${j}_video`][0], 'lesson-videos');
        lessonArray.push({ title: lessons[j].title, videoUrl });
      } else {
        return res.status(400).json({ message: `Video for lesson ${j} is missing` });
      }
    }

    // Create the new course
    const newCourse = new Course({
      name,
      description,
      rate,
      price,
      instructor: instructorId,
      category,
      thumbnailUrl,
      lessons: lessonArray,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the course' });
  }
}


}

module.exports = new coursesController(); 