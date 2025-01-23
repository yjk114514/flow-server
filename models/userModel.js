// 存放与数据库交互的模型文件，负责执行数据库查询、插入、更新等操作。

const mysql = require('mysql');
const dbConfig = require('../config/dbConfig');
const connection = mysql.createConnection(dbConfig);
connection.connect();

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });
    });
};

exports.addUser = (newUser) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (name, age) VALUES (?,?)';
        connection.query(query, [newUser.name, newUser.age], (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });
    });
};