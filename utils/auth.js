const crypto = require('crypto');

function generateUUID() {
    // 生成 16 字节的随机数据
    const buffer = crypto.randomBytes(16);

    // 按照 UUID 的格式设置版本号和变体
    buffer[6] = (buffer[6] & 0x0f) | 0x40;
    buffer[8] = (buffer[8] & 0x3f) | 0x80;

    // 将字节数组转换为 UUID 格式的字符串
    return [
        buffer.toString('hex', 0, 4),
        buffer.toString('hex', 4, 6),
        buffer.toString('hex', 6, 8),
        buffer.toString('hex', 8, 10),
        buffer.toString('hex', 10, 16)
    ].join('-');
}



function generateToken(UUID) {
    // 定义一个密钥，用于 HMAC 算法，实际应用中应存储在安全的地方
    const secretKey = 'a1a30bb4-2fad-41de-9c22-cafbc5d10409';
    // 使用 HMAC-SHA256 算法进行加密
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(UUID);
    // 生成十六进制的 token
    return hmac.digest('hex');
}
const validateToken = (token, UUID) => {
    // 定义一个密钥，用于 HMAC 算法，实际应用中应存储在安全的地方
    const secretKey = 'a1a30bb4-2fad-41de-9c22-cafbc5d10409';
    // 使用 HMAC-SHA256 算法进行加密
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(UUID);
    // 生成十六进制的 token
    const expectedToken = hmac.digest('hex');
    // 比较生成的 token 和传入的 token 是否相等
    return token === expectedToken;
}

exports.generateUUID = generateUUID;
exports.generateToken = generateToken;
exports.validateToken = validateToken;

