const crypto = require('crypto');

// 生成 Token 的密钥，可存储在环境变量中以提高安全性
const SECRET_KEY = 'your_secret_key';

// 生成 Token 的函数
function generateToken(username, createdAt) {
    const dataToHash = `${username}:${createdAt}`;
    return crypto.createHmac('sha256', SECRET_KEY)
        .update(dataToHash)
        .digest('hex');
}

// 验证 Token 的中间件
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send('Unauthorized: No Authorization header provided');
    }

    const parts = authHeader.split(' ');
    if (parts.length!== 2 || parts[0]!== 'Bearer') {
        return res.status(401).send('Unauthorized: Invalid Authorization header format');
    }

    const token = parts[1];
    // 假设从请求体、查询参数或者其他地方获取用户名和创建时间
    const { username, createdAt } = req.body; // 这里需要根据实际情况修改获取方式

    if (!username ||!createdAt) {
        return res.status(400).send('Bad Request: Missing username or createdAt');
    }

    const validToken = generateToken(username, createdAt);

    if (token!== validToken) {
        return res.status(401).send('Unauthorized: Invalid token');
    }

    next();
};