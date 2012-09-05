/*jslint evil:true */
/**
 * Dynamic thread loader
 *
 * 
 *  * 
 * 
 * 
*/

// 
var DISQUS;
if (!DISQUS || typeof DISQUS == 'function') {
    throw "DISQUS object is not initialized";
}
// 

// json_data and default_json django template variables will close
// and re-open javascript comment tags

(function () {
    var jsonData, cookieMessages, session, key;

    /* */ jsonData = {"reactions": [{"body": "\u5475\u5475\uff0c\u6709B\u5377\u5417\uff1f\u6211\u4eec\u901a\u5e38\u7684\u89c4\u77e9\u662f B\u5377 \u6bd4 A\u5377 \u96be\uff01RT @woshisanhu: Git\u6d4b\u9a8c\uff08A\u5377\uff09 http://t.co/sGQlXc1g", "author_name": "tigertooth4", "source_url": "http://backtype.com/", "id": 97244096, "get_service_url": "http://twitter.com/", "title": "", "url": "http://twitter.com/tigertooth4/status/182480781472567297", "source": "backtype", "get_service_name": "twitter", "avatar_url": "http://a0.twimg.com/profile_images/1346981369/bear-square_normal.jpg", "author_url": "#", "date_created": "1 \u661f\u671f\u524d", "retweets": []}, {"body": "Git\u6d4b\u9a8c\uff08A\u5377\uff09 http://t.co/17z2Hkr8", "author_name": "woshisanhu", "source_url": "http://backtype.com/", "id": 97244097, "get_service_url": "http://twitter.com/", "title": "", "url": "http://twitter.com/woshisanhu/status/182344470099001344", "source": "backtype", "get_service_name": "twitter", "avatar_url": "http://a0.twimg.com/profile_images/1158840900/4503572fg751a875bca78_690_normal.jpg", "author_url": "#", "date_created": "1 \u661f\u671f\u524d", "retweets": []}], "reactions_limit": 10, "ordered_highlighted": [], "posts": {"475809553": {"edited": false, "author_is_moderator": false, "from_request_user": null, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "\u80fd\u516c\u5e03\u7b54\u6848\u5417\uff1f\u5b66\u4e60\u4e00\u4e0b...", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2012-03-25_09:55:53", "date": "3 \u5929\u524d", "message": "<p>\u80fd\u516c\u5e03\u7b54\u6848\u5417\uff1f\u5b66\u4e60\u4e00\u4e0b...</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 2, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "5434b3998b76a92c081aebf10c3bb2d4", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "476185764": {"edited": false, "author_is_moderator": true, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "\u770b\u770b\u4e4b\u524d\u7684\u56de\u590d\u3002\u6b63\u786e\u7b54\u6848\u76f8\u5f53\u5730\u6709\u89c4\u5f8b\uff0cabcd\u5e73\u5747\u5206\u914d\uff0c\u76f8\u90bb\u95ee\u9898\u7b54\u6848\u4e0d\u540c\u3002", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2012-03-25_22:57:49", "date": "3 \u5929\u524d", "message": "<p>\u770b\u770b\u4e4b\u524d\u7684\u56de\u590d\u3002\u6b63\u786e\u7b54\u6848\u76f8\u5f53\u5730\u6709\u89c4\u5f8b\uff0cabcd\u5e73\u5747\u5206\u914d\uff0c\u76f8\u90bb\u95ee\u9898\u7b54\u6848\u4e0d\u540c\u3002</p>", "approved": true, "is_last_child": false, "author_is_founder": true, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 1, "down_voted": false, "is_first_child": true, "has_been_anonymized": false, "highlighted": false, "parent_post_id": 475809553, "depth": 1, "points": 0, "user_key": "jiangxin", "author_is_creator": true, "email": "", "killed": false, "is_realtime": false}, "476426197": {"edited": false, "author_is_moderator": false, "from_request_user": null, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "\u8c22\u8c22\u4e86\u3002", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2012-03-26_10:23:00", "date": "2 \u5929\u524d", "message": "<p>\u8c22\u8c22\u4e86\u3002</p>", "approved": true, "is_last_child": true, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": 476185764, "depth": 2, "points": 0, "user_key": "5434b3998b76a92c081aebf10c3bb2d4", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "474229926": {"edited": false, "author_is_moderator": false, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": "6 \u5929\u524d", "dislikes": 0, "raw_message": "1-5) a b d d(\u8499\u7684) b\n6-10)b b(\u8499\u7684)  b c a\n11-15) c b d d d(\u8499\u7684) \n16-20)d(\u8499\u7684)   b(\u8499\u7684)  d(\u8499\u7684)   a(\u8499\u7684)  a(\u8499\u7684) \n\u5728\u6821\u5b66\u751f\uff0c\u8001\u5e08\u7ed9\u6253\u4e2a\u5206\uff0c\u6ca1\u6709\u67e5\u8d44\u6599\uff0c\u7528\u65f615\u5206\u949f\u3002Git\u5e95\u5c42\u57fa\u7840\u547d\u4ee4\u548c\u4ed3\u5e93\u7ba1\u7406\u5185\u5bb9\u6ca1\u6709\u6982\u5ff5\u3002\u8c22\u8c22\uff01", "has_replies": false, "vote": false, "votable": true, "last_modified_by": "author", "real_date": "2012-03-23_01:30:02", "date": "6 \u5929\u524d", "message": "<p>1-5) a b d d(\u8499\u7684) b<br>6-10)b b(\u8499\u7684)  b c a<br>11-15) c b d d d(\u8499\u7684) <br>16-20)d(\u8499\u7684)   b(\u8499\u7684)  d(\u8499\u7684)   a(\u8499\u7684)  a(\u8499\u7684) <br>\u5728\u6821\u5b66\u751f\uff0c\u8001\u5e08\u7ed9\u6253\u4e2a\u5206\uff0c\u6ca1\u6709\u67e5\u8d44\u6599\uff0c\u7528\u65f615\u5206\u949f\u3002Git\u5e95\u5c42\u57fa\u7840\u547d\u4ee4\u548c\u4ed3\u5e93\u7ba1\u7406\u5185\u5bb9\u6ca1\u6709\u6982\u5ff5\u3002\u8c22\u8c22\uff01</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 1, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "google-b4495a74fd4464ffb75f5c36c8ca999e", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "476184825": {"edited": false, "author_is_moderator": true, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "\u5bf9\u4e86\u4e03\u4e2a\u3002\u30103\u3011\u5c31\u662f\u60f3\u8ba9\u5927\u5bb6\u5bf9Git\u64cd\u4f5c\u5fc3\u91cc\u6709\u5e95\uff0c\u77e5\u9053\u4ec0\u4e48\u65f6\u5019\u6570\u636e\u8fd8\u80fd\u633d\u56de\u3002\u53ef\u4ee5\u628a git add \u5f53\u505a\u662f\u8349\u7a3f\u4fdd\u5b58\u3002\u30106\u3011\u8981\u9009\u62e9\u672c\u5730\u5ffd\u7565\u3002\u30107\u3011\u8981\u5728\u9879\u76ee\u7ea7\u8bbe\u7f6e\u5c31\u4e0d\u80fd\u901a\u8fc7\u672c\u5730\u5c5e\u6027\u5b8c\u6210\uff0c\u5728\u4e66\u4e2d\u6709\u7b54\u6848\u3002\u30108\u3011\u5c31\u662f\u4e0d\u60f3\u8ba9\u4eba\u6253\u6ee1\u5206\u800c\u5df2\u3002\u301010\u3011\u9519\u4e86\u4e0d\u5e94\u8be5\u3002\u301011\u3011\u4f60\u7684\u9009\u62e9\u4f1a\u7834\u574f\u52a0\u5165\u6682\u5b58\u7684\u4fee\u6539\u3002\u301014\u3011\u8bd5\u8bd5\u5c31\u77e5\u9053\u662f\u9519\u7684\uff0c\u8fd8\u6709\u4e0d\u80fd\u5220\u9664\u672c\u5730\u5f53\u524d\u5de5\u4f5c\u5206\u652f\u3002\u301015\u3011SVN\u6700\u5f31\u7684\u5c31\u662f\u96be\u4ee5\u786e\u5b9a\u5206\u652f\u54ea\u4e9b\u63d0\u4ea4\u5c1a\u672a\u5408\u5e76\u3002\u53ef\u80fd\u662f\u9898\u76ee\u672c\u8eab\u5305\u542b\u6b67\u4e49\uff0c\u542c\u8fc7\u8bfe\u7684\u4f1a\u77e5\u9053b\u662f\u9519\u7684\u3002\u301016\u3011\u5236\u9020\u4e2a\u51b2\u7a81\uff0c\u7528 git ls-files -s \u770b\u770b\u3002\u301017\u3011\u4e71\u82b1\u6e10\u6b32\u8ff7\u4eba\u773c\u3002\u4e09\u4e2a\u7f16\u9020\u7684\u871c\u7f50\u751f\u6548\u4e86\u3002\u301018\u3011\u548c\u301019\u3011\u83ab\u975e\u5ba1\u9898\u65f6\u9a6c\u864e\u4e86\uff1f\u9898\u76ee\u4e2d\u6709\u52a0\u7c97\u554a\u3002\u301020\u3011\u5ba2\u6237\u8981\u4e00\u4e2aRedmine\u7684\u9898\uff0c\u6211\u597d\u4e0d\u5bb9\u6613\u51d1\u9f50\u4e86\u56db\u4e2a\u7b54\u6848\u3002", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2012-03-25_22:55:15", "date": "3 \u5929\u524d", "message": "<p>\u5bf9\u4e86\u4e03\u4e2a\u3002\u30103\u3011\u5c31\u662f\u60f3\u8ba9\u5927\u5bb6\u5bf9Git\u64cd\u4f5c\u5fc3\u91cc\u6709\u5e95\uff0c\u77e5\u9053\u4ec0\u4e48\u65f6\u5019\u6570\u636e\u8fd8\u80fd\u633d\u56de\u3002\u53ef\u4ee5\u628a git add \u5f53\u505a\u662f\u8349\u7a3f\u4fdd\u5b58\u3002\u30106\u3011\u8981\u9009\u62e9\u672c\u5730\u5ffd\u7565\u3002\u30107\u3011\u8981\u5728\u9879\u76ee\u7ea7\u8bbe\u7f6e\u5c31\u4e0d\u80fd\u901a\u8fc7\u672c\u5730\u5c5e\u6027\u5b8c\u6210\uff0c\u5728\u4e66\u4e2d\u6709\u7b54\u6848\u3002\u30108\u3011\u5c31\u662f\u4e0d\u60f3\u8ba9\u4eba\u6253\u6ee1\u5206\u800c\u5df2\u3002\u301010\u3011\u9519\u4e86\u4e0d\u5e94\u8be5\u3002\u301011\u3011\u4f60\u7684\u9009\u62e9\u4f1a\u7834\u574f\u52a0\u5165\u6682\u5b58\u7684\u4fee\u6539\u3002\u301014\u3011\u8bd5\u8bd5\u5c31\u77e5\u9053\u662f\u9519\u7684\uff0c\u8fd8\u6709\u4e0d\u80fd\u5220\u9664\u672c\u5730\u5f53\u524d\u5de5\u4f5c\u5206\u652f\u3002\u301015\u3011SVN\u6700\u5f31\u7684\u5c31\u662f\u96be\u4ee5\u786e\u5b9a\u5206\u652f\u54ea\u4e9b\u63d0\u4ea4\u5c1a\u672a\u5408\u5e76\u3002\u53ef\u80fd\u662f\u9898\u76ee\u672c\u8eab\u5305\u542b\u6b67\u4e49\uff0c\u542c\u8fc7\u8bfe\u7684\u4f1a\u77e5\u9053b\u662f\u9519\u7684\u3002\u301016\u3011\u5236\u9020\u4e2a\u51b2\u7a81\uff0c\u7528 git ls-files -s \u770b\u770b\u3002\u301017\u3011\u4e71\u82b1\u6e10\u6b32\u8ff7\u4eba\u773c\u3002\u4e09\u4e2a\u7f16\u9020\u7684\u871c\u7f50\u751f\u6548\u4e86\u3002\u301018\u3011\u548c\u301019\u3011\u83ab\u975e\u5ba1\u9898\u65f6\u9a6c\u864e\u4e86\uff1f\u9898\u76ee\u4e2d\u6709\u52a0\u7c97\u554a\u3002\u301020\u3011\u5ba2\u6237\u8981\u4e00\u4e2aRedmine\u7684\u9898\uff0c\u6211\u597d\u4e0d\u5bb9\u6613\u51d1\u9f50\u4e86\u56db\u4e2a\u7b54\u6848\u3002</p>", "approved": true, "is_last_child": true, "author_is_founder": true, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": true, "has_been_anonymized": false, "highlighted": false, "parent_post_id": 474229926, "depth": 1, "points": 0, "user_key": "jiangxin", "author_is_creator": true, "email": "", "killed": false, "is_realtime": false}}, "ordered_posts": [475809553, 476185764, 476426197, 474229926, 476184825], "realtime_enabled": false, "ready": true, "mediaembed": [], "has_more_reactions": false, "realtime_paused": true, "integration": {"receiver_url": null, "hide_user_votes": false, "reply_position": false, "disqus_logo": false}, "highlighted": {}, "reactions_start": 0, "media_url": "http://mediacdn.disqus.com/1332966743", "users": {"google-b4495a74fd4464ffb75f5c36c8ca999e": {"username": "google-b4495a74fd4464ffb75f5c36c8ca999e", "tumblr": "", "about": "", "display_name": "Gota GJ", "url": "http://disqus.com/google-b4495a74fd4464ffb75f5c36c8ca999e/", "registered": true, "remote_id": "b4495a74fd4464ffb75f5c36c8ca999e", "linkedin": "", "blog": "", "remote_domain": 6, "points": 1, "facebook": "", "avatar": "http://mediacdn.disqus.com/1332966743/images/noavatar32.png", "delicious": "", "is_remote": true, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": "Google"}, "jiangxin": {"username": "jiangxin", "tumblr": "", "about": "", "display_name": "jiangxin", "url": "http://disqus.com/jiangxin/", "registered": true, "remote_id": null, "linkedin": "", "blog": "", "remote_domain": "", "points": 2, "facebook": "", "avatar": "http://mediacdn.disqus.com/uploads/users/1960/200/avatar32.jpg?1332730515", "delicious": "", "is_remote": false, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": ""}, "5434b3998b76a92c081aebf10c3bb2d4": {"username": "Gengfo", "tumblr": "", "about": "", "display_name": "Gengfo", "url": "http://disqus.com/guest/5434b3998b76a92c081aebf10c3bb2d4/", "registered": false, "remote_id": null, "linkedin": "", "blog": "", "remote_domain": "", "points": null, "facebook": "", "avatar": "http://mediacdn.disqus.com/1332966743/images/noavatar32.png", "delicious": "", "is_remote": false, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": ""}}, "user_unapproved": {}, "messagesx": {"count": 0, "unread": []}, "thread": {"voters_count": 0, "offset_posts": 0, "slug": "world_hello_gita", "paginate": false, "num_pages": 1, "days_alive": 0, "moderate_none": false, "voters": {}, "total_posts": 5, "realtime_paused": true, "queued": false, "pagination_type": "append", "user_vote": null, "likes": 0, "num_posts": 5, "closed": false, "per_page": 0, "id": 616663046, "killed": false, "moderate_all": false}, "forum": {"use_media": true, "avatar_size": 32, "apiKey": "scXqMpXpA83uSapbcVu5CYe6a5ognQeWsHGrmZi6soCwBqyvWfTPxZctKt8f7JdO", "features": {}, "comment_max_words": 0, "mobile_theme_disabled": false, "is_early_adopter": false, "login_buttons_enabled": false, "streaming_realtime": false, "reply_position": false, "id": 1151900, "default_avatar_url": "http://mediacdn.disqus.com/1332966743/images/noavatar32.png", "template": {"url": "http://mediacdn.disqus.com/1332966743/uploads/themes/7884a9652e94555c70f96b6be63be216/theme.js?252", "mobile": {"url": "http://mediacdn.disqus.com/1332966743/uploads/themes/mobile/theme.js", "css": "http://mediacdn.disqus.com/1332966743/uploads/themes/mobile/theme.css"}, "api": "1.1", "name": "Houdini", "css": "http://mediacdn.disqus.com/1332966743/uploads/themes/7884a9652e94555c70f96b6be63be216/theme.css?252"}, "max_depth": 0, "ranks_enabled": false, "lastUpdate": "", "linkbacks_enabled": true, "allow_anon_votes": true, "revert_new_login_flow": false, "stylesUrl": "http://mediacdn.disqus.com/uploads/styles/115/1900/worldhello.css", "show_avatar": true, "reactions_enabled": true, "disqus_auth_disabled": false, "name": "WorldHello Blog", "language": "zh", "mentions_enabled": false, "url": "worldhello", "allow_anon_post": true, "thread_votes_disabled": false, "hasCustomStyles": false, "moderate_all": false}, "settings": {"realtimeHost": "qq.disqus.com", "uploads_url": "http://media.disqus.com/uploads", "ssl_media_url": "https://securecdn.disqus.com/1332966743", "realtime_url": "http://rt.disqus.com/forums/realtime-cached.js", "facebook_app_id": "52254943976", "minify_js": true, "recaptcha_public_key": "6LdKMrwSAAAAAPPLVhQE9LPRW4LUSZb810_iaa8u", "read_only": false, "facebook_api_key": "52254943976", "juggler_url": "http://juggler.services.disqus.com", "realtimePort": "80", "debug": false, "disqus_url": "http://disqus.com", "media_url": "http://mediacdn.disqus.com/1332966743"}, "ranks": {}, "request": {"sort": "hot", "is_authenticated": false, "user_type": "anon", "subscribe_on_post": 0, "missing_perm": null, "user_id": null, "remote_domain_name": "", "remote_domain": "", "is_verified": false, "profile_url": "", "username": "", "is_global_moderator": false, "sharing": {}, "timestamp": "2012-03-29_02:34:30", "is_moderator": false, "ordered_unapproved_posts": [], "unapproved_posts": {}, "forum": "worldhello", "is_initial_load": true, "display_username": "", "points": null, "has_email": false, "moderator_can_edit": false, "is_remote": false, "userkey": "", "page": 1}, "context": {"use_twitter_signin": false, "use_fb_connect": false, "show_reply": true, "active_switches": ["autocommitted_thread", "bespin", "community_icon", "embedapi", "google_auth", "mentions", "new_facebook_auth", "new_thread_create", "realtime_cached", "show_captcha_on_links", "ssl", "static_reply_frame", "static_styles", "statsd_created", "upload_media", "use_rs_paginator_60m"], "sigma_chance": 10, "use_google_signin": false, "switches": {"olark_admin_addons": true, "listactivity_replies": true, "discovery_preview_users": true, "es_index_threads": true, "use_master_for_api": true, "google_auth": true, "discovery_best_comment": true, "html_email": true, "moderate_ascending": true, "community_icon": true, "realtime_cached": true, "google_analytics": true, "olark_admin_packages": true, "static_styles": true, "firehose": true, "stats": true, "firehose_gnip_http": true, "transitional_sessions": true, "discovery_redirect_event": true, "show_captcha_on_links": true, "statsd_created": true, "bespin": true, "olark_support": true, "firehose_gnip": true, "firehose_pubsub": true, "olark_addons": true, "new_facebook_auth": true, "limit_get_posts_days_30d": true, "edits_to_spam": true, "juggler_enabled": true, "discovery_network": true, "phoenix": true, "phoenix_reputation": true, "new_thread_create": true, "use_impermium": true, "upload_media": true, "vip_read_slave": true, "embedapi": true, "ssl": true, "es_index_posts_discovery": true, "autocommitted_thread": true, "usertransformer_reputation": true, "fingerprint": true, "send_to_impermium": true, "firehose_push": true, "theme_editor_disabled": true, "firehose_message_db_lookup": true, "listactivity_replies_30d": true, "realtime": true, "phoenix_optout": true, "statsd.timings": true, "train_impermium": true, "firehose_pubsub_throttle": true, "git_themes": true, "new_moderate": true, "use_rs_paginator_60m": true, "redis_threadcount": true, "mentions": true, "olark_install": true, "static_reply_frame": true}, "forum_facebook_key": "", "use_yahoo": false, "subscribed": false, "active_gargoyle_switches": ["discovery_best_comment", "discovery_network", "discovery_preview_users", "discovery_redirect_event", "edits_to_spam", "es_index_posts_discovery", "es_index_threads", "fingerprint", "firehose", "firehose_gnip", "firehose_gnip_http", "firehose_message_db_lookup", "firehose_pubsub", "firehose_pubsub_throttle", "firehose_push", "git_themes", "google_analytics", "html_email", "juggler_enabled", "limit_get_posts_days_30d", "listactivity_replies", "listactivity_replies_30d", "moderate_ascending", "new_moderate", "olark_addons", "olark_admin_addons", "olark_admin_packages", "olark_install", "olark_support", "phoenix", "phoenix_optout", "phoenix_reputation", "realtime", "redis_threadcount", "send_to_impermium", "show_captcha_on_links", "stats", "statsd.timings", "theme_editor_disabled", "train_impermium", "transitional_sessions", "use_impermium", "use_master_for_api", "usertransformer_reputation", "vip_read_slave"], "realtime_speed": 15000, "use_openid": false}}; /* */
    /* __extrajson__ */
    cookieMessages = {"user_created": null, "post_has_profile": null, "post_twitter": null, "post_not_approved": null}; session = {"url": null, "name": null, "email": null};
    jsonData.forum.template = {"url": "http://mediacdn.disqus.com/1332966743/uploads/themes/7884a9652e94555c70f96b6be63be216/theme.js?252", "mobile": {"url": "http://mediacdn.disqus.com/1332966743/uploads/themes/mobile/theme.js", "css": "http://mediacdn.disqus.com/1332966743/uploads/themes/mobile/theme.css"}, "api": "1.1", "name": "Houdini", "css": "http://mediacdn.disqus.com/1332966743/uploads/themes/7884a9652e94555c70f96b6be63be216/theme.css?252"};
    jsonData.context.active_gargoyle_switches = ["discovery_best_comment", "discovery_network", "discovery_preview_users", "discovery_redirect_event", "edits_to_spam", "es_index_posts_discovery", "es_index_threads", "fingerprint", "firehose", "firehose_gnip", "firehose_gnip_http", "firehose_message_db_lookup", "firehose_pubsub", "firehose_pubsub_throttle", "firehose_push", "git_themes", "google_analytics", "html_email", "juggler_enabled", "limit_get_posts_days_30d", "listactivity_replies", "listactivity_replies_30d", "moderate_ascending", "new_moderate", "olark_addons", "olark_admin_addons", "olark_admin_packages", "olark_install", "olark_support", "phoenix", "phoenix_optout", "phoenix_reputation", "realtime", "redis_threadcount", "send_to_impermium", "show_captcha_on_links", "stats", "statsd.timings", "theme_editor_disabled", "train_impermium", "transitional_sessions", "use_impermium", "use_master_for_api", "usertransformer_reputation", "vip_read_slave"];
    jsonData.context.active_switches = ["autocommitted_thread", "bespin", "community_icon", "embedapi", "google_auth", "mentions", "new_facebook_auth", "new_thread_create", "realtime_cached", "show_captcha_on_links", "ssl", "static_reply_frame", "static_styles", "statsd_created", "upload_media", "use_rs_paginator_60m"];
    jsonData.context.all_switches = {"olark_admin_addons": true, "listactivity_replies": true, "discovery_preview_users": true, "es_index_threads": true, "use_master_for_api": true, "google_auth": true, "discovery_best_comment": true, "html_email": true, "moderate_ascending": true, "community_icon": true, "realtime_cached": true, "google_analytics": true, "olark_admin_packages": true, "static_styles": true, "firehose": true, "stats": true, "firehose_gnip_http": true, "transitional_sessions": true, "discovery_redirect_event": true, "show_captcha_on_links": true, "statsd_created": true, "bespin": true, "olark_support": true, "firehose_gnip": true, "firehose_pubsub": true, "olark_addons": true, "new_facebook_auth": true, "limit_get_posts_days_30d": true, "edits_to_spam": true, "juggler_enabled": true, "discovery_network": true, "phoenix": true, "phoenix_reputation": true, "new_thread_create": true, "use_impermium": true, "upload_media": true, "vip_read_slave": true, "embedapi": true, "ssl": true, "es_index_posts_discovery": true, "autocommitted_thread": true, "usertransformer_reputation": true, "fingerprint": true, "send_to_impermium": true, "firehose_push": true, "theme_editor_disabled": true, "firehose_message_db_lookup": true, "listactivity_replies_30d": true, "realtime": true, "phoenix_optout": true, "statsd.timings": true, "train_impermium": true, "firehose_pubsub_throttle": true, "git_themes": true, "new_moderate": true, "use_rs_paginator_60m": true, "redis_threadcount": true, "mentions": true, "olark_install": true, "static_reply_frame": true};

    DISQUS.jsonData = jsonData;
    DISQUS.jsonData.cookie_messages = cookieMessages;
    DISQUS.jsonData.session = session;

    if (DISQUS.useSSL) {
        DISQUS.useSSL(DISQUS.jsonData.settings);
    }

    // The mappings below are for backwards compatibility--before we port all the code that
    // accesses jsonData.settings to DISQUS.settings

    var mappings = {
        debug:                'disqus.debug',
        minify_js:            'disqus.minified',
        read_only:            'disqus.readonly',
        recaptcha_public_key: 'disqus.recaptcha.key',
        facebook_app_id:      'disqus.facebook.appId',
        facebook_api_key:     'disqus.facebook.apiKey'
    };

    var urlMappings = {
        disqus_url:    'disqus.urls.main',
        media_url:     'disqus.urls.media',
        ssl_media_url: 'disqus.urls.sslMedia',
        realtime_url:  'disqus.urls.realtime',
        uploads_url:   'disqus.urls.uploads'
    };

    if (DISQUS.jsonData.context.switches.realtime_setting_change) {
        urlMappings.realtimeHost = 'realtime.host';
        urlMappings.realtimePort = 'realtime.port';
    }
    for (key in mappings) {
        if (mappings.hasOwnProperty(key)) {
            DISQUS.settings.set(mappings[key], DISQUS.jsonData.settings[key]);
        }
    }

    for (key in urlMappings) {
        if (urlMappings.hasOwnProperty(key)) {
            DISQUS.jsonData.settings[key] = DISQUS.settings.get(urlMappings[key]);
        }
    }
}());

DISQUS.jsonData.context.csrf_token = '21bc467119200cb06806902fa8e2f5b0';

DISQUS.jsonData.urls = {
    login: 'http://disqus.com/profile/login/',
    logout: 'http://disqus.com/logout/',
    upload_remove: 'http://worldhello.disqus.com/thread/world_hello_gita/async_media_remove/',
    request_user_profile: 'http://disqus.com/AnonymousUser/',
    request_user_avatar: 'http://mediacdn.disqus.com/1332966743/images/noavatar92.png',
    verify_email: 'http://disqus.com/verify/',
    remote_settings: 'http://worldhello.disqus.com/_auth/embed/remote_settings/',
    edit_profile_window: 'http://disqus.com/embed/profile/edit/',
    embed_thread: 'http://worldhello.disqus.com/thread.js',
    embed_vote: 'http://worldhello.disqus.com/vote.js',
    embed_thread_vote: 'http://worldhello.disqus.com/thread_vote.js',
    embed_thread_share: 'http://worldhello.disqus.com/thread_share.js',
    embed_queueurl: 'http://worldhello.disqus.com/queueurl.js',
    embed_hidereaction: 'http://worldhello.disqus.com/hidereaction.js',
    embed_more_reactions: 'http://worldhello.disqus.com/more_reactions.js',
    embed_subscribe: 'http://worldhello.disqus.com/subscribe.js',
    embed_highlight: 'http://worldhello.disqus.com/highlight.js',
    embed_block: 'http://worldhello.disqus.com/block.js',
    update_moderate_all: 'http://worldhello.disqus.com/update_moderate_all.js',
    update_days_alive: 'http://worldhello.disqus.com/update_days_alive.js',
    show_user_votes: 'http://worldhello.disqus.com/show_user_votes.js',
    forum_view: 'http://worldhello.disqus.com/world_hello_gita',
    cnn_saml_try: 'http://disqus.com/saml/cnn/try/',
    realtime: DISQUS.jsonData.settings.realtime_url,
    thread_view: 'http://worldhello.disqus.com/thread/world_hello_gita/',
    twitter_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/twitter/begin/',
    yahoo_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/yahoo/begin/',
    openid_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/openid/begin/',
    googleConnect: DISQUS.jsonData.settings.disqus_url + '/_ax/google/begin/',
    community: 'http://worldhello.disqus.com/community.html',
    admin: 'http://worldhello.disqus.com/admin/moderate/',
    moderate: 'http://worldhello.disqus.com/admin/moderate/',
    moderate_threads: 'http://worldhello.disqus.com/admin/moderate-threads/',
    settings: 'http://worldhello.disqus.com/admin/settings/',
    unmerged_profiles: 'http://disqus.com/embed/profile/unmerged_profiles/',
    juggler: DISQUS.jsonData.settings.juggler_url,

    channels: {
        def:      'http://disqus.com/default.html', /* default channel */
        auth:     'https://disqus.com/embed/login.html',
        tweetbox: 'http://disqus.com/forums/integrations/twitter/tweetbox.html?f=worldhello',
        edit:     'http://worldhello.disqus.com/embed/editcomment.html'
    }
};


// 
//     
DISQUS.jsonData.urls.channels.reply = 'http://mediacdn.disqus.com/1332966743/build/system/reply.html';
DISQUS.jsonData.urls.channels.upload = 'http://mediacdn.disqus.com/1332966743/build/system/upload.html';
DISQUS.jsonData.urls.channels.sso = 'http://mediacdn.disqus.com/1332966743/build/system/sso.html';
DISQUS.jsonData.urls.channels.facebook = 'http://mediacdn.disqus.com/1332966743/build/system/facebook.html';
//     
// 
