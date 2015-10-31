<?php
//普通用户申请加入社团
//to团长
$lang['msg']['10']['title'] = '[{username}]申请加入到你的社团中。';
$lang['msg']['10']['content'] = '';
$lang['msg']['10']['act'] = '<a href="javascript:;void(0)" onclick="agree_apply({uid},{tid})">接受</a><a href="javascript:;void(0)" onclick="deny_apply({uid},{tid})">拒绝</a>';

//to用户
$lang['msg']['11']['title'] = '【{object_name}】已通过你的申请。';
$lang['msg']['11']['content'] = '';
$lang['msg']['11']['act'] = '';

//to用户
$lang['msg']['12']['title'] = '【{object_name}】拒绝了你的申请。';
$lang['msg']['12']['content'] = '';
$lang['msg']['12']['act'] = '';

//团长邀请普通用户加入社团
//to用户
$lang['msg']['20']['title'] = '【{object_name}】邀请你加入到它的社团中。';
$lang['msg']['20']['content'] = '';
$lang['msg']['20']['act'] = '<a href="javascript:;void(0)" onclick="agree_invite({uid},{tid})">接受</a><a href="javascript:;void(0)" onclick="deny_invite({uid},{tid})">拒绝</a>';

//to团长
$lang['msg']['21']['title'] = '[{username}]已通过了你的邀请,成为了【{object_name}】的一员。';
$lang['msg']['21']['content'] = '';
$lang['msg']['21']['act'] = '';

//to用户
$lang['msg']['22']['title'] = '[{username}]拒绝了你的邀请。';
$lang['msg']['22']['content'] = '';
$lang['msg']['22']['act'] = '';

//关注模板
$lang['msg']['40']['title'] = '[{username}]关注了你。';
$lang['msg']['40']['content'] = '';
$lang['msg']['40']['act'] = '<a href="javascript:;void(0)" onclick="agree_apply({uid},{tid})">接受</a><a href="javascript:;void(0)" onclick="deny_apply({uid},{tid})">拒绝</a>';


$lang['msg']['41']['title'] = '【{username}】求关注。';
$lang['msg']['41']['content'] = '';
$lang['msg']['41']['act'] = '<a href="javascript:;void(0)" onclick="follow_agree({uid},{fuid})">接受</a><a href="javascript:;void(0)" onclick="follow_deny({uid},{fuid})">拒绝</a>';


$lang['msg']['42']['title'] = '【{username}】拒绝了你的求关注。';
$lang['msg']['42']['content'] = '';
$lang['msg']['42']['act'] = '';

//私信模板
$lang['msg']['8']['title'] = '[{username}]给你发了私信.';
$lang['msg']['8']['content'] = '{object_name}';
$lang['msg']['8']['act'] = '';

?>