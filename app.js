// 创建一个写入流，将日志写入到文件中

const fs = require('fs');
const path = require('path');
const request = require('./network/request');
const logStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });

const originalConsoleLog = console.log;

// 重写 console.log 方法
console.log = function (...args) {
    const message = args.join(' ') + '\n';
    logStream.write(message);
    originalConsoleLog.apply(this, args);
};

const express = require('express');
const app = express();
const port = 3000;

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

// 保存原始的 console.log


app.use('/users', usersRouter);
app.use('/products', productsRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});