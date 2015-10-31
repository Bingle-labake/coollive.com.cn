<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/
$route['default_controller'] = "lauch";
$route['404_override'] = '';

$route['room/(:num)'] = "program/index/$1";//节目直播
$route['users/(:num)'] = "users/home/$1";//节目直播
$route['events/(:any)/clips/(:any)'] = "events/clips/$2/$1";
$route['events/(:num)'] = "events/index/$1";
#$route['program/(:num)'] = "program/index/$1";//节目直播
#$route['c/(:num)'] = "channel/index/$1";//个人频道页
#$route['v/(:any)'] = "media/video/$1";//视频底层页
#$route['u/(:any)'] = "users/index/$1";//用户社交中心
#$route['^((?!space).)+$']  = "error";//非用户中心跳转到404


/* End of file routes.php */
/* Location: ./application/config/routes.php */