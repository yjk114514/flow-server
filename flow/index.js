const {xSearchTimelineByTop} = require('./xSearchTimelineByTop');
const {xSearchTimelineByLatest} = require('./xSearchTimelineByLatest');
const {xSearchProfileByTop} = require('./xSearchProfileByTop');
const {xSearchProfileByLatest} = require('./xSearchProfileByLatest');

exports.generateDataFlow = async function* (req) {
    switch (req.query.flowId) {
        case 'xSearchTimelineByTop':
            let xSearchTimelineByTopSendTimes = 0;
            while (true) {
                const generateData = await xSearchTimelineByTop(req);
                if (generateData === null || xSearchTimelineByTopSendTimes >= 100) {
                    break;
                } else {
                    xSearchTimelineByTopSendTimes++;
                    yield generateData;
                }
            }
            break
        case 'xSearchTimelineByLatest':
            let xSearchTimelineByLatestSendTimes = 0;
            while (true) {
                const generateData = await xSearchTimelineByLatest(req);
                if (generateData === null || xSearchTimelineByLatestSendTimes >= 100) {
                    break;
                } else {
                    xSearchTimelineByLatestSendTimes++;
                    yield generateData;
                }
            }
            break
        case 'xSearchProfileByTop':
            let xSearchProfileByTopSendTimes = 0;
            while (true) {
                const generateData = await xSearchProfileByTop(req);
                if (generateData === null || xSearchProfileByTopSendTimes >= 100) {
                    break;
                } else {
                    xSearchProfileByTopSendTimes++;
                    yield generateData;
                }
            }
            break
        case 'xSearchProfileByLatest':
            let xSearchProfileByLatestSendTimes = 0;
            while (true) {
                const generateData = await xSearchProfileByLatest(req);
                if (generateData === null || xSearchProfileByLatestSendTimes >= 100) {
                    break;
                } else {
                    xSearchProfileByLatestSendTimes++;
                    yield generateData;
                }
            }
            break
        default:
            return null;
    }
    // if (req.query.flowId === 'xSearchTimelineByTop') {
    //     let sendTimes = 0;
    //     while (true) {
    //         console.log(`xFlow ${sendTimes}`);
    //         const generateData = await xSearchTimelineByTop(req);
    //         if (generateData === null || sendTimes >= 100) {
    //             console.log(`xFlowCallback ${sendTimes}, break`);
    //             console.log(`${generateData === null} or ${sendTimes >= 100}`)
    //             break;
    //         } else {
    //             sendTimes++;
    //             yield generateData;
    //             console.log(`xFlowCallback ${sendTimes}`);
    //         }
    //     }
    // } else {
    //     return null;
    // }
}