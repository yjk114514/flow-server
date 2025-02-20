const axios = require("axios");
const fs = require("fs");
const initData = require("./tkban-tweets.json");


async function getRetweeters(tweetId) {
    console.log(tweetId)
    const variables = {
        "tweetId": tweetId,
        "count": 20,
        "cursor": "",
        "includePromotedContent": true
    }

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
        "responsive_web_grok_analysis_button_from_backend": true,
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
    axios.defaults.proxy = {
        host: '127.0.0.1',
        port: 7890,
        protocol: 'http:'
    };
    const baseURL = "https://x.com/i/api/graphql/niCJ2QyTuAgZWv01E7mqJQ/Retweeters?"
    res = await axios.get(encodeURI(baseURL + formData), {
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.5",
            "accept-encoding": "gzip",
            "referer": "https://x.com/wwxwashere/status/1299986517935493121/retweets",
            "content-type": "application/json",
            "x-client-uuid": "57fc5485-a33a-49ec-af20-682744b4455a",
            "x-twitter-auth-type": "OAuth2Session",
            "x-csrf-token": "6892b0e3b5c21d894b669f1aa9881ea763b937af85fba21f16a3ef9ed0a21026970be121d5ef8841a0adfc89fbe4d0e9715cafba5786874d6b57739030579de3e075623a5944c2d37a629b4c24107d49",
            "x-twitter-client-language": "en",
            "x-twitter-active-user": "no",
            "x-client-transaction-id": "I+IdlUbfSb92Xl88Zw4KEbUMhqJg4Pdvh+6z8bh9i1y+IRKDOPEbdfa5aXhDMsIrGUyVQCC/pNawNjIKv8iac9s7hUh3IA",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
            "pragma": "no-cache",
            "cache-control": "no-cache",
            "te": "trailers",
            "cookie": "night_mode=2; kdt=Ev4gcKr3oBEsu2vmXiuYb0aIMBT6u0uaG737St2A; dnt=1; g_state={\"i_p\":1733134533963,\"i_l\":2}; auth_token=3f14f761ea97efebc3971b17d1f082fbaf8f4542; auth_multi=\"1861824846117629952:f8c35c57871de37dee3e5a5ce383368242c2f047\"; guest_id=v1%3A173338176322189991; twid=u%3D1831528509493465088; ct0=6892b0e3b5c21d894b669f1aa9881ea763b937af85fba21f16a3ef9ed0a21026970be121d5ef8841a0adfc89fbe4d0e9715cafba5786874d6b57739030579de3e075623a5944c2d37a629b4c24107d49; guest_id_marketing=v1%3A173338176322189991; guest_id_ads=v1%3A173338176322189991; personalization_id=\"v1_ldy5ugfXu9jw1XClhe3EDA==\"; lang=en"
        }
    })
        .then(response => {
            responseData = response.data;
            fmtData = xTweetRetweetListCallback(responseData);
            return fmtData
        })
    return res


    function xTweetRetweetListCallback(responseData) {
        fs.writeFileSync("./tweetRetweetList.json", JSON.stringify(responseData, null, 4) + "\n");
//     /data/retweeters_timeline/timeline/instructions/0/entries/0/content/itemContent/user_results/result/legacy/screen_name
        let retweeters = [];
        for (let i = 0; i < (responseData.data.retweeters_timeline.timeline ?
            responseData.data.retweeters_timeline.timeline.instructions[0] ?
            responseData.data.retweeters_timeline.timeline.instructions[0].entries ?
                responseData.data.retweeters_timeline.timeline.instructions[0].entries.length:0:0:0); i++) {
            try {
                const userResult = responseData.data.retweeters_timeline.timeline.instructions[0].entries[i].content.itemContent?.user_results
                if (userResult?.result?.legacy?.screen_name) {
                    retweeters.push(userResult.result.legacy.screen_name)
                }
            } catch (error) {
                console.log(error);
            }
        }
        // console.log(retweeters)
        return retweeters
    }
}

(async ()=>{
    const initData = require("./fmt0.json");
    const fmtData = require("./fmt1.json");
    let num=0
    for (let i = 0; i < initData.length; i++) {
        if (fmtData[i].retweeters === undefined)
        {
            const tweetId = initData[i].id;
            console.log(tweetId)
            const retweeter = await getRetweeters(tweetId)
            num += retweeter.length
            console.log(num)
            fmtData[i].retweeters = retweeter
            const waitingTime = new Promise((resolve) => {
                setTimeout(resolve, 1000);
            })
            await waitingTime;
            fs.writeFileSync(
                "./fmt1.json",
                JSON.stringify(fmtData, null, 4) + "\n"
            )

        }else {
            num+= fmtData[i].retweeters.length
            console.log("skip")
        }
    }
})()