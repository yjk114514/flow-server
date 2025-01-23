const express = require('express');
const productRouter = express.Router();
const usersController = require('../controllers/usersController');

productRouter.get('/list', usersController.getUsers);
productRouter.post('/add', usersController.addUser);

module.exports = productRouter;