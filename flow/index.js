const {xSearchTimeline} = require('./xSearch/req/xSearchTimeline');
const {xSearchProfile} = require('./xSearch/req/xSearchProfile');

exports.generateDataFlow = async function* (req) {
    switch (req.query.flowId) {
        case 'xSearchTimeline':
            let xSearchTimelineSendTimes = 0;
            while (true) {
                const generateData = await xSearchTimeline(req);
                if (generateData === null || xSearchTimelineSendTimes >= 100) {
                    break;
                } else {
                    xSearchTimelineSendTimes++;
                    yield generateData;
                }
            }
            break
        case 'xSearchProfile':
            let xSearchProfileSendTimes = 0;
            while (true) {
                const generateData = await xSearchProfile(req);
                if (generateData === null || xSearchProfileSendTimes >= 100) {
                    break;
                } else {
                    xSearchProfileSendTimes++;
                    yield generateData;
                }
            }
            break
        default:
            return null;
    }
}