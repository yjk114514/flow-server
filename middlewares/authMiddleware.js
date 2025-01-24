const {validateToken} = require('../utils/auth');
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


    if (validateToken(req.headers['flow-id'], token)) {
        return res.status(401).send('Unauthorized: Invalid token');
    }

    next();
};