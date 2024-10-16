const {addCourse,getAll,getCourseById,updateById,deleteById} = require("../repositories/course.repository");


class coursesController {
    constructor() {}
    async getAllCourses(req, res) {
        const courses = await getAll();
        if (courses!=-1){
            res.json(courses);
        }else{
            res.json("no courses found");
        }
    }

    async addCourse(req,res){
        const courses=await getAll();
        const newCourse=req.body;
        const exist =courses.find(course=>course.name==newCourse.name)
        if(newCourse && !exist)
        {
            await addCourse(newCourse);
            res.json(newCourse);
        }else{
            res.status(500).json("course already exists or invalid data");
        }
    }

    async getCourse(req, res) {
        const id=req.params.id
        const course= await getCourseById(id); 
        if(course!=-1){
            res.json(course);
        }else{
            res.json("course doesn't exist")
        }
    }

    async updateCourse(req,res){
        const id=req.params.id;
        const course=req.body;
        const courses=await getAll();
        const exist =courses.find(course=>course.id==id)
        if(exist){
            if (id && course){
                await updateById(id,course);
                res.send("course updated successfully ");
            }else{
                res.send("id and course data needed for update")
            }
        }else{
            res.json("course doesn't exist");
        }
    }

    async deleteCourse(req, res) {
        const id = req.params.id;
        const courses = await getAll();
        const exist = courses.find(course => course.id === id);
        if (exist) {
            await deleteById(id);
            res.json("course deleted successfully");
        } else {
            res.json("course doesn't exist");
        }
    }
}

module.exports = new coursesController(); 
