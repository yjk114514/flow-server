const fs = require('fs');
const path = require('path');

function timeIntervalSegmenter(startTime, endTime, intervalMinutes) {
    // 将输入的时间字符串转换为Date对象
    const start = new Date(startTime);
    const end = new Date(endTime);

    // 初始化结果数组
    const segments = [];

    // 当前时间从开始时间开始
    let currentTime = new Date(start);

    // 当当前时间小于结束时间时，继续分段
    while (currentTime < end) {
        // 计算下一个时间段的结束时间
        const nextTime = new Date(currentTime.getTime() + intervalMinutes * 60000);

        // 如果下一个时间段的结束时间超过了结束时间，则将其设置为结束时间
        if (nextTime > end) {
            nextTime.setTime(end.getTime());
        }

        // 将当前时间段添加到结果数组中
        segments.push({
            start: currentTime.toISOString().replace('T', ' ').substring(0, 16),
            end: nextTime.toISOString().replace('T', ' ').substring(0, 16)
        });

        // 更新当前时间为下一个时间段的开始时间
        currentTime.setTime(nextTime.getTime());
    }

    return segments;
}

// 示例用法
const startTime = "2023-10-01T08:00";
const endTime = "2023-10-01T12:00";
const intervalMinutes = 30;

const segments = timeIntervalSegmenter(startTime, endTime, intervalMinutes);
segments.forEach(segment => {
    console.log(`${segment.start} - ${segment.end}`);
});
