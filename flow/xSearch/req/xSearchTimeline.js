const xAccounts = require("../../../resource/xAccounts.json")
const {requestWithRetry} = require("../../../network/request")
const axios = require("axios");
const {features} = require("./static")
const netConfig = require("../../../config/netConfig.js");
const {xResponseCallback} = require("../res/xResponseHandle.js")


exports.xSearchTimeline = async function (req) {
    req.cursor = req.cursor ? req.cursor : ''
    const baseURL = `https://x.com/i/api/graphql/${xAccounts.accounts[xAccounts.currentAccountIndex].area}/SearchTimeline?`
    const rawQuery = req.query.rawQuery ? req.query.rawQuery : `${req.query.queryStr} until:${req.query.endTimeStr} since:${req.query.startTimeStr}`
    console.log(`rawQuery from IP ${req.ip.toString()}`, rawQuery)

    const variables = {
        "rawQuery": rawQuery,
        "count": 20,
        "cursor": req.cursor,
        "querySource": "typed_query",
        "product": req.query.product?req.query.product:"Latest"
    }

    const formData = "variables=" + JSON.stringify(variables) + "&features=" + JSON.stringify(features)
    const xResponseData = {}

    const constructAxiosInstance = () => {
        return axios.create({
            headers: xAccounts.accounts[xAccounts.currentAccountIndex].headers,
            ...netConfig
        })
    }
    await requestWithRetry(encodeURI(baseURL + formData), constructAxiosInstance, (errorStatus) => {
        if (errorStatus === 429 || 401 || 502) {
            xAccounts.currentAccountIndex = (xAccounts.currentAccountIndex + 1) % xAccounts.accounts.length
            return true
        } else {
            console.log('request failed with status code: ' + errorStatus)
            return false
        }
    })
        .then(response => {
            xResponseData.dataPackage = response.data
            xResponseData.formatted = xResponseCallback(xResponseData.dataPackage)
        })

    req.cursor = xResponseData.dataPackage?.search_by_raw_query?.search_timeline?.timeline?.instructions[0]?.entries[xResponseData.dataPackage?.search_by_raw_query?.search_timeline?.timeline?.instructions[0]?.entries?.length - 1]?.content?.value || xResponseData.dataPackage?.search_by_raw_query?.search_timeline?.timeline?.instructions[xResponseData.dataPackage?.search_by_raw_query?.search_timeline?.timeline?.instructions?.length - 1]?.entry?.content?.value || null;

    if (xResponseData.formatted.length === 0 && req.cursor === null) {
        return null
    } else {
        return JSON.stringify(xResponseData.formatted)
    }
}

