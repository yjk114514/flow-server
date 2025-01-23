const express = require('express');
const userRouter = express.Router();
const usersController = require('../controllers/usersController');

userRouter.get('/list', usersController.getUsers);
userRouter.post('/add', usersController.addUser);

module.exports = userRouter;