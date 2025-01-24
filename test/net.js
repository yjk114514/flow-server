const xAccounts = require("../resource/xAccounts.json");
const axios = require("axios");
const baseURL = `https://x.com/i/api/graphql/${xAccounts["accounts"][xAccounts["currentAccountIndex"]].area}/SearchTimeline?`
const rawQuery = `hello until:2024-01-01 since:2023-01-01`
const variables = {
    "rawQuery": rawQuery,
    "cursor": '',
    "count": 20,
    "querySource": "typed_query",
    "product": "Top"
}
const features = {
    "profile_label_improvements_pcf_label_in_post_enabled": false,
    "rweb_tipjar_consumption_enabled": true,
    "responsive_web_graphql_exclude_directive_enabled": true,
    "verified_phone_label_enabled": false,
    "creator_subscriptions_tweet_preview_api_enabled": true,
    "responsive_web_graphql_timeline_navigation_enabled": true,
    "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false,
    "communities_web_enable_tweet_community_results_fetch": true,
    "c9s_tweet_anatomy_moderator_badge_enabled": true,
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
    "responsive_web_enhance_cards_enabled": false
}
const formData = "variables=" + JSON.stringify(variables) + "&features=" + JSON.stringify(features)
axios.defaults.proxy = {
    host: '127.0.0.1',
    port: 7890,
    protocol: 'http:'
};
res = axios.get(encodeURI(baseURL + formData), {headers: xAccounts["accounts"][xAccounts["currentAccountIndex"]].headers})
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.status : error.message);
    });
