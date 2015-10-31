<?php

/**
 * OAuth2授权登录
 */

return array (
    'sina' => array (
        'name' => '新浪微博',
        'icon' => 'sina',
        'use' => 1,
        'key' => '588249965',
        'secret' => '715af542b30f9b921c7480d77257048e',
    	'scope' => 'friendships_groups_read,friendships_groups_write,statuses_to_me_read,follow_app_official_microblog',
        'url' => 'http://www.coollive.com.cn/oauth'
    ),
	'weibo' => array (
        'name' => '新浪微博',
        'icon' => 'sina',
        'use' => 1,
        'key' => '588249965',
        'secret' => '715af542b30f9b921c7480d77257048e',
    	'scope' => 'friendships_groups_read,friendships_groups_write,statuses_to_me_read,follow_app_official_microblog',
        'url' => 'http://www.coollive.com.cn/oauth'
    ),
    'qq' => array (
        'name' => 'QQ',
        'icon' => 'qq',
        'use' => 1,
        'key' => '101208067',
        'secret' =>  '349fd017a83e413f9beda62bbc61a38f',
        'scope' => 'add_share add_pic_t',
    	'url' => 'http://www.coollive.com.cn/oauth'
    )
);