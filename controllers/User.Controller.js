const { getAll,addUser ,getUserById,updateById,deleteById} = require("../repositories/user.repository");

class UserController {
    constructor() {}
    async getAllUsers(req, res) {
        const users = await getAll();
        if (users!=-1){
            res.json(users);
        }else{
            res.json("no users found");
        }
    }

    async addUser(req,res){
        const users=await getAll();
        const data=req.body;
        const exist =users.find(user=>user.email==data.email)
        if(data && !exist)
        {
            await addUser(data);
            res.json(data);
        }else{
            res.status(500).json("User already exists or invalid data");
        }
    }
    async getUser(req, res) {
        const id=req.params.id
        const user= await getUserById(id); 
        if(user!=-1){
            res.json(user);
        }else{
            res.json("user doesn't exist")
        }
    }

    async updateUserById(req,res){
        const id=req.params.id;
        const user=req.body;
        const users=await getAll();
        const exist =users.find(user=>user.id==id)
        if(exist){
            if (id && user){
                await updateById(id,user);
                res.send("user updated successfully ");
            }else{
                res.send("id and user data needed for updated")
            }
        }else{
            res.json("user doesn't exist");
        }
    }

    async deleteUser(req,res){
        const id =req.params.id;
        const users=await getAll();
        const exist =users.find(user=>user.id==id);
        if(exist){
            if(id){
                await deleteById(id);
                res.json("user deleted successfully");
            }else{
                res.json("please provide a valid id ");
            }
        }else{
            res.json("user doesn't exist");
        }
    }
}

module.exports = new UserController(); 
