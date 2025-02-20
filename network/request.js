
async function requestWithRetry(URL,getAxiosInstance, whetherRetry) {
  let response;
  let retries = 0;
  const maxRetries = 12; // 最大重试次数
  let errorOccurred = false;
  let axiosInstance;
  while (retries < maxRetries) {
    try {
      axiosInstance = getAxiosInstance();
      response = await axiosInstance.get(URL);
      break;
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        errorOccurred = true;
        console.error('MaxRetryError: ', error);
        break;
      }
      if (whetherRetry(error.status)) {
        console.log(`Receive status ${error.status}, ${whetherRetry(error.status)},retrying times: ${retries} ...`);
         // 继续重试
      } else {
        errorOccurred = true;
        console.error('No more retry: ', error);
        break;
      }
    }
  }
  if (!errorOccurred) {
    return response.data;
  }
  return null;
}

exports.requestWithRetry = requestWithRetry;
