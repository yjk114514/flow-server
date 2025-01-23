// 包含业务逻辑处理的控制器文件，从路由接收请求，调用模型层处理数据，再返回响应。

const usersModel = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await usersModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
};

exports.addUser = async (req, res) => {
    try {
        const newUser = req.body;
        const result = await usersModel.addUser(newUser);
        res.send('User added successfully');
    } catch (error) {
        res.status(500).send('Error adding user');
    }
};