var is_run = false;
var q_url = 'http://q.saiku.com.cn';
function apply(uid,tid){//申请-用户
	 if(!is_run){
		 is_run = true;
		 $.ajax({
				type: "post",
				url: "/space/team/apply",
				dataType:"json",
				data:{uid:uid,tid:tid},
				success: function(data){
				      if(!data['result']){
					    alert(data['msg']);
					  }else{
					    window.location.reload();
					  }
				      is_run = false;
				    
				}
			}); 
	 }
}

function agree_apply(uid,tid){//同意申请-团长
	 $.ajax({
			type: "post",
			url: "/space/team/agree_apply",
			dataType:"json",
			data:{uid:uid,tid:tid},
			success: function(data){
			      if(!data['result']){
				    alert(data['msg']);
				  }else{
				    alert('操作成功');
				  }
			    
			}
		});
}

function deny_apply(uid,tid){//拒绝申请-团长
	 $.ajax({
			type: "post",
			url: "/space/team/deny_apply",
			dataType:"json",
			data:{uid:uid,tid:tid},
			success: function(data){
			      if(!data['result']){
				    alert(data['msg']);
				  }else{
				    alert('拒绝成功');
				  }
			    
			}
		});
}

function invite(uid,tid){//邀请-团长
	 if(!is_run){
		 is_run = true;
		 $.ajax({
				type: "post",
				url: "/space/team/invite",
				dataType:"json",
				data:{uid:uid,tid:tid},
				success: function(data){
				      if(!data['result']){
					    alert(data['msg']);
					  }else{
					    window.location.reload();
					  }
				      is_run = false;
				}
			}); 
	 }
}

function agree_invite(uid,tid){//同意邀请-用户
	 $.ajax({
			type: "post",
			url: "/space/team/agree_invite",
			dataType:"json",
			data:{uid:uid,tid:tid},
			success: function(data){
			      if(!data['result']){
				    alert(data['msg']);
				  }else{
				    alert('加入成功');
				  }
			    
			}
		});
}

function deny_invite(uid,tid){//拒绝邀请-用户
	 $.ajax({
			type: "post",
			url: "/space/team/deny_invite",
			dataType:"json",
			data:{uid:uid,tid:tid},
			success: function(data){
			      if(!data['result']){
				    alert(data['msg']);
				  }else{
				    alert('拒绝成功');
				  }
			    
			}
		});
}

function quit_team(tid){//退出-用户
	 if(!is_run){
		 is_run = true;
		 $.ajax({
				type: "post",
				url: "/space/team/quit_team",
				dataType:"json",
				data:{tid:tid},
				success: function(data){
				      if(!data['result']){
					    alert(data['msg']);
					  }else{
					    window.location.reload();
					  }
				      is_run = false;
				    
				}
		 });
	 }
}


function follow_agree(uid,fuid){//接受求关注
	 if(!is_run){
		 is_run = true;
		 $.ajax({
				url: q_url+"/relation/agreefollow?callback=?",
				dataType:"jsonp",
				data:{uid:uid,fuid:fuid},
				success: function(data){
				      alert(data['msg']);
				      is_run = false;
				    
				}
		 });
	 }
}

function follow_deny(uid,fuid){//拒绝求关注
	 if(!is_run){
		 is_run = true;
		 $.ajax({
				url: q_url+"/relation/denyfollow?callback=?",
				dataType:"jsonp",
				data:{uid:uid,fuid:fuid},
				success: function(data){
				      alert(data['msg']);
				      is_run = false;
				    
				}
		 });
	 }
}