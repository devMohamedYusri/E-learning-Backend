const Users = require("../models/user.model");

const addUser = async (newUser) => {
    try {
        const data = await Users.create(newUser);
        return `User added successfully: ${data}`;
    } catch (err) {
        return -1; 
    }
};

const getAll = async () => {
    try {
        const data = await Users.find();
        return data; 
    } catch (err) {
        return -1; 
    }
};

const getUserById = async (id) => {
    try {
        const user = await Users.findOne({ _id: id });
        return user;
    } catch (err) {
        return -1; 
    }
};

const updateById = async (id, user) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(id, user, { new: true });
        return updatedUser; 
    } catch (err) {
        return -1; 
    }
};

const deleteById = async (id) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(id);
        return "User deleted successfully";
    } catch (err) {
        return -1; 
    }
};

module.exports = {
    addUser,
    getAll,
    getUserById,
    updateById,
    deleteById,
};
