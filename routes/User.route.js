const express = require("express");
const UserController = require("../controllers/User.Controller");
const router = express.Router();

router.get('/All', UserController.getAllUsers);
router.get('/user/:id', UserController.getUser);
router.post('/add',UserController.addUser)
router.put('/update/:id',UserController.updateUserById)
router.delete('/delete/:id',UserController.deleteUser)


module.exports = router;
