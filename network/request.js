
async function requestWithRetry(URL,getAxiosInstance,whetherRetry) {
  let response;
  let retries = 0;
  const maxRetries = 12; // 最大重试次数
  let errorOccurred = false;
  let axiosInstance;
  while (retries < maxRetries) {
    try {
      axiosInstance = getAxiosInstance();
      response = await axiosInstance.get(URL);
      break; // 请求成功，跳出重试循环
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        errorOccurred = true;
        console.error('达到最大重试次数，记录错误:', error);
        break;
      }
      if (whetherRetry && whetherRetry(error.status)) {
        console.log(`重试第 ${retries} 次...`);
         // 继续重试
      } else {
        errorOccurred = true;
        console.error('根据 whetherRetry 函数判断，不进行重试，记录错误:', error);
        break;
      }
    }
  }
  if (!errorOccurred) {
    console.log('请求成功，响应数据:', response.data);
    return response.data;
  }
  return null;
}

exports.requestWithRetry = requestWithRetry;
