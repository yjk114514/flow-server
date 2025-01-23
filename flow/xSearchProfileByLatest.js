const xAccounts = require("../resource/xAccounts.json")
const {requestWithRetry} = require("../network/request")
const axios = require("axios");
const {response} = require("express");
const fs = require("fs");

exports.xSearchProfileByLatest = async function (req) {
    const xData = {}
    req.cursor = req.cursor ? req.cursor : ''
    const baseURL = `https://x.com/i/api/graphql/${xAccounts["accounts"][xAccounts["currentAccountIndex"]].area}/SearchTimeline?`
    const rawQuery = `(from:${req.query.screenName}) until:${req.query.endTimeStr} since:${req.query.startTimeStr}`
    console.log(`rawQuery from IP ${req.ip.toString()}`,rawQuery)
    const variables = {"rawQuery":rawQuery,"count":20,"cursor":req.cursor,"querySource":"typed_query","product":"Latest"}
    const features = {
        "profile_label_improvements_pcf_label_in_post_enabled": true,
        "rweb_tipjar_consumption_enabled": true,
        "responsive_web_graphql_exclude_directive_enabled": true,
        "verified_phone_label_enabled": false,
        "creator_subscriptions_tweet_preview_api_enabled": true,
        "responsive_web_graphql_timeline_navigation_enabled": true,
        "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false,
        "premium_content_api_read_enabled": false,
        "communities_web_enable_tweet_community_results_fetch": true,
        "c9s_tweet_anatomy_moderator_badge_enabled": true,
        "responsive_web_grok_analyze_button_fetch_trends_enabled": false,
        "responsive_web_grok_analyze_post_followups_enabled": true,
        "responsive_web_jetfuel_frame": false,
        "responsive_web_grok_share_attachment_enabled": true,
        "articles_preview_enabled": true,
        "responsive_web_edit_tweet_api_enabled": true,
        "graphql_is_translatable_rweb_tweet_is_translatable_enabled": true,
        "view_counts_everywhere_api_enabled": true,
        "longform_notetweets_consumption_enabled": true,
        "responsive_web_twitter_article_tweet_consumption_enabled": true,
        "tweet_awards_web_tipping_enabled": false,
        "creator_subscriptions_quote_tweet_preview_enabled": false,
        "freedom_of_speech_not_reach_fetch_enabled": true,
        "standardized_nudges_misinfo": true,
        "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": true,
        "rweb_video_timestamps_enabled": true,
        "longform_notetweets_rich_text_read_enabled": true,
        "longform_notetweets_inline_media_enabled": true,
        "responsive_web_grok_image_annotation_enabled": false,
        "responsive_web_enhance_cards_enabled": false
    }
    const formData = "variables=" + JSON.stringify(variables) + "&features=" + JSON.stringify(features)

    const getAxiosInstance = () => {
        return axios.create({
            // baseURL: encodeURI(baseURL + formData),
            headers: xAccounts["accounts"][xAccounts["currentAccountIndex"]].headers,
            timeout: 10000,
            proxy: {
                host: '127.0.0.1',
                port: 7890,
                protocol: 'http:'
            },
        })
    }
    await requestWithRetry(encodeURI(baseURL + formData), getAxiosInstance, (errorStatus) => {
        if (errorStatus === 429 || 401 || 502) {
            xAccounts["currentAccountIndex"] = (xAccounts["currentAccountIndex"] + 1) % xAccounts["accounts"].length
            return true
        } else {
            console.log('request failed with status code: ' + errorStatus)
            return false
        }
    })
        //     axiosInstance.get(encodeURI(baseURL + formData))
        .then(response => {
            xData.dataPackage = response.data
            xData.formatted = xResponseCallback(xData.dataPackage)
        })
    req.cursor = xData.dataPackage?.search_by_raw_query?.search_timeline?.timeline?.instructions[0]?.entries[xData.dataPackage?.search_by_raw_query?.search_timeline?.timeline?.instructions[0]?.entries?.length - 1]?.content?.value || xData.dataPackage?.search_by_raw_query?.search_timeline?.timeline?.instructions[xData.dataPackage?.search_by_raw_query?.search_timeline?.timeline?.instructions?.length - 1]?.entry?.content?.value || null;

    if (xData.formatted.length === 0 && req.cursor === null) {
        return null
    } else {
        return JSON.stringify(xData.formatted)
    }
}


function xResponseCallback(dataPackage) {
    let resource = [];
    let instructions = dataPackage.search_by_raw_query.search_timeline.timeline.instructions;
    for (let instruction of instructions) {
        if (instruction.type === "TimelineAddEntries") {
            let entries = instruction.entries;
            for (let entry of entries) {
                if (entry.entryId.startsWith("tweet-")) {
                    let mediaList = [];
                    let result = entry.content.itemContent.tweet_results.result;
                    let core = result.core || result.tweet?.core;
                    let name = core?.user_results?.result?.legacy?.name;
                    let location = core?.user_results?.result?.legacy?.location;
                    let restId = core?.user_results?.result?.rest_id;
                    let followersCount = core?.user_results?.result?.legacy?.followers_count;
                    let friendsCount = core?.user_results?.result?.legacy?.friends_count;
                    let accountCreatedAt = core?.user_results?.result?.legacy?.created_at;
                    let description = core?.user_results?.result?.legacy?.description;
                    let profileUrl = core?.user_results?.result?.legacy?.url;
                    let isBlueVerified = core?.user_results?.result?.is_blue_verified;
                    let legacy = result.legacy || result.tweet?.legacy;
                    let createdAt = legacy?.created_at;
                    let content = legacy?.full_text;
                    let userMentions = legacy?.entities?.user_mentions;
                    let favoriteCount = legacy?.favorite_count;
                    let retweetCount = legacy?.retweet_count;
                    let replyCount = legacy?.reply_count;
                    let screenName = core?.user_results?.result?.legacy?.screen_name;
                    let idStr = legacy?.id_str;
                    let isQuoteStatus = legacy?.is_quote_status;
                    let isVideo = false;
                    let isPhoto = false;
                    let medias = legacy?.extended_entities?.media || [];
                    for (let i = 0; i < medias.length; i++) {
                        let media = medias[i];
                        if (media.type === "video") {
                            let variants = media.video_info?.variants || [];
                            mediaList.push(variants[variants.length - 1]?.url);
                            isVideo = true;
                        } else if (media.type === "photo") {
                            mediaList.push(media.media_url_https);
                            isPhoto = true;
                        } else if (media.type === "animated_gif") {
                            mediaList.push(media.media_url_https);
                        }
                    }
                    if (!resource.some(item => item.id_str === idStr)) {
                        resource.push({
                            name: name,
                            restId: restId,
                            // followersCount: followersCount,
                            // friendsCount: friendsCount,
                            // accountCreatedAt: accountCreatedAt,
                            // description: description,
                            // profileUrl: profileUrl,
                            content: content,
                            media: mediaList,
                            favoriteCount: favoriteCount,
                            retweetCount: retweetCount,
                            replyCount: replyCount,
                            url: `https://twitter.com/${screenName}/status/${idStr}`,
                            createdAt: createdAt,
                            location: location,
                            // isQuoteStatus: isQuoteStatus,
                            // isVideo: isVideo,
                            // isPhoto: isPhoto,
                            // userMentions: userMentions,
                            // isBlueVerified: isBlueVerified,
                            idStr: idStr
                        });
                    }
                }
            }
        }
    }
    return resource;
}

//
// const whetherDisconnect = (response) => {
//     switch (response.status) {
//         case 401 || 403 || 429:
//             return true;
//         case 200:
//             if (response.data.errors) {
//                 return true;
//             } else {
//                 if (response.data.data.search_by_raw_query.search_timeline.timeline.instructions[response.data.search_by_raw_query.search_timeline.timeline.instructions.length - 1].entries.length === 0) {
//             }
//             default:
//                 return false;
//     }
//
// }
