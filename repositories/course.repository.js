const courses=require("../models/course.model");


const addCourse = async (newCourse) => {
    try {
        const data = await courses.create(newCourse);
        return `course added successfully: ${data}`;
    } catch (err) {
        return -1; 
    }
};

const getAll = async () => {
    try {
        const data = await courses.find();
        return data; 
    } catch (err) {
        return -1; 
    }
};

const getCourseById = async (id) => {
    try {
        const course = await courses.findOne({ _id: id });
        return course;
    } catch (err) {
        return -1; 
    }
};

const updateById = async (id, course) => {
    try {
        const updatedCourse = await courses.findByIdAndUpdate(id, course, { new: true });
        return updatedCourse; 
    } catch (err) {
        return -1; 
    }
};

const deleteById = async (id) => {
    try {
        const deleteCourse = await courses.findByIdAndDelete(id);
        return "course deleted successfully";
    } catch (err) {
        return -1; 
    }
};

module.exports = {
    addCourse,
    getAll,
    getCourseById,
    updateById,
    deleteById,
};
