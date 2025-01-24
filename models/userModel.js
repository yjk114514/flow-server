// 存放与数据库交互的模型文件，负责执行数据库查询、插入、更新等操作。

const mysql = require('mysql2');
const dbConfig = require('../config/dbConfig');
const {generateUUID,generateToken} = require('../utils/getToken');
// const connection = mysql.createConnection(dbConfig);
// connection.connect();

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        // connection.query('SELECT * FROM users', (error, results, fields) => {
        //     if (error) reject(error);
        //     resolve(results);
        // });
    });
};

exports.addUser = (newUser) => {
    newUser.id = generateUUID();
    newUser.token = generateToken(newUser.password);
    return new Promise((resolve, reject) => {
        // const query = 'INSERT INTO users (username, email, id, token) VALUES (?,?,?,?)';
        // connection.query(query, [newUser.username, newUser.email, newUser.id,newUser.token], (error, results, fields) => {
        //     if (error) reject(error);
        //     resolve(results);
        // });
    });
};