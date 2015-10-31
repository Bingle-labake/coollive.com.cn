<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**************************************************************************
*   Comments:   直播-
*   Author: Bingle
*   Last Modified:  2015-06-21
**************************************************************************/
class Questions extends Live_Controller {
	function __construct()
	{
		parent::__construct();			
	}
     
    /**
     * 
     */
    public function create() {
        /*
         * event_id:166297
           text:nice
           role:BAh7CEkiDWV2ZW50X2lkBjoGRUZJIgsxNjYyOTcGOwBGSSIMdXNlcl9pZAY7AEZpA7+9DUkiC2lzX3ZpcAY7AEZG--5778e086c12b94e7a20a5580a312149ba5e11e18

           event_id:166297
           text:http://www.tudou.com/albumplay/FEeuXK-QlGM/hk0O7XKdmzc.html
           role:BAh7CEkiDWV2ZW50X2lkBjoGRUZJIgsxNjYyOTcGOwBGSSIMdXNlcl9pZAY7AEZpA7+9DUkiC2lzX3ZpcAY7AEZG--5778e086c12b94e7a20a5580a312149ba5e11e18
           embed:
        */
        if($this->uid > 0) {
            $event_id = $this->input->post('event_id', true);
            $text     = $this->input->post('text', true);
            $embed    = $this->input->post('embed', true);

            echo '{"question_id":595280,
            "text":"<a href=\"http://www.tudou.com/albumplay/FEeuXK-QlGM/hk0O7XKdmzc.html\" target=\"_blank\">http://www.tudou.com/albumplay/FEeuXK-QlGM/hk0O7XKdmzc.html</a>",
            "user_id":"labake",
            "user":{"about_me":"",
                    "first_name":"labake",
                    "has_been_authenticated":true,
                    "last_name":null,
                    "needs_to_confirm_email":false,
                    "user_id":"labake",
                    "alt":900543,
                    "admin":false,
                    "content_mod":false,
                    "profile_photo_thumb_url":"/profile_photos/tile_30x30/noprofile.png",
                    "is_fb":false,
                    "ppv_approved":false,
                    "is_affiliate":false,
                    "following_events":[],
                    "is_locked":true,
                    "plan_name":"Basic",
                    "can_create_spreecast":false,
                    "allow_friend_requests":true,
                    "vcat":null
                    },
            "action":"approved",
            "action_type":0,
            "on_air":null,
            "off_air":null,
            "starred_at":null,
            "score":0,
            "vote_total":1,
            "votes":{
                    "900543":1
                    }
            }';
        }else {

        }
        echo '{"question_id":595278,
        "text":"wo...",
        "user_id":"labake",
        "user":{"about_me":"",
                "first_name":"labake",
                "has_been_authenticated":true,
                "last_name":null,
                "needs_to_confirm_email":false,
                "user_id":"labake",
                "alt":900543,
                "admin":false,
                "content_mod":false,
                "profile_photo_thumb_url":"/profile_photos/tile_30x30/noprofile.png",
                "is_fb":false,
                "ppv_approved":false,
                "is_affiliate":false,
                "following_events":[],
                "is_locked":true,
                "plan_name":"Basic",
                "can_create_spreecast":false,
                "allow_friend_requests":true,
                "vcat":null
        },
        "action":"approved",
        "action_type":0,
        "on_air":null,
        "off_air":null,
        "starred_at":null,
        "score":0,
        "vote_total":1,
        "votes":{
                "900543":1
                }
        }';
    }

    /**
     *
     */
    public function remove() {
        $id = $this->input->get("question_id");

        echo '{"response":"ok"}';
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
