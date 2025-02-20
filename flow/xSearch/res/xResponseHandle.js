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

exports.xResponseCallback = xResponseCallback;