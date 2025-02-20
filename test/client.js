const Axios = require('axios');
const axiosInstance = Axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

// 这里 reqInfo.json 未使用，如果你后续需要使用，可以添加相应逻辑
const reqInfo = require('./reqInfo.json');

const req = {
    query: {
        flowId: 'xSearchProfileByTop',
        cursor: null,
    }
};

// 发送 GET 请求
axiosInstance.get('/', {
    params: req.query
})
    .then(response => {
        console.log('请求成功，响应数据:', response.data);
    })
    .catch(error => {
        if (error.response) {
            // 请求已发送，服务器返回状态码不在 2xx 范围内
            console.log('服务器响应错误:', error.response.data);
            console.log('状态码:', error.response.status);
            console.log('响应头:', error.response.headers);
        } else if (error.request) {
            // 请求已发送，但没有收到响应
            console.log('没有收到服务器响应:', error.request);
        } else {
            // 在设置请求时发生错误
            console.log('请求设置错误:', error.message);
        }
        console.log('配置信息:', error.config);
    });