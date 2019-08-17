/* this is the active environment */
var environment = 'local';

/* insert required environment config items here */
var environmentConfigs = {

    local: {
        apiUrl  : 'http://stg.craftandcode.com.sg/clients/rws/hhn6/',
        gameId  : 2 // Bodies of Work
    },
    uat: {
        apiUrl  : 'http://stg.craftandcode.com.sg/clients/rws/hhn6/',
        gameId  : 2 // Bodies of Work
    },
    prod: {
        apiUrl  : 'http://stg.craftandcode.com.sg/clients/rws/hhn6/',
        gameId  : 2 // Bodies of Work
    }
};

/*
 * These are global configs, which will be injected into environmentConfigs
 * so you have to use use different variable names with the environmentConfigs.
 */
var globalConfigs = {
    apiVersion          : 'v1.0',
    dateFormat          : 'DD MMMM YYYY',
    dateTimeFormat      : 'DD MMMM YYYY, HH:mm'
};

var configGet = function( property ){
    return environmentConfigs[ environment ][ property ];
}

var fb_share_url        = 'http://stg.craftandcode.com.sg/clients/rws/hhn6/';
var fb_share_image      = 'https://rws-hhn6-s3.s3.amazonaws.com/game/bow/share/FB_BOW.jpg';
var fb_share_desc_en    = 'As Singapore\'s bloodiest past comes back alive, will you be able to escape the evil that lurks within? A haunting awaits with exciting prizes. Click to learn more.';
var fb_share_desc_cn    = '新加坡最具血腥的历史再次重演，邪灵伺机而动，你能够逃脱吗？ 危机与奖励并存。点击获取更多信息。';

var twitter_share_url   = 'http://stg.craftandcode.com.sg/clients/rws/hhn6/game/twitter';

var weibo_share_url     = 'http://stg.craftandcode.com.sg/clients/rws/hhn6/game/weibo';
var weibo_share_image   = 'https://rws-hhn6-s3.s3.amazonaws.com/game/bow/share/weibo_BOW.jpg';

var cdn_url             = "https://dg0l7q9c72lxu.cloudfront.net/game";
