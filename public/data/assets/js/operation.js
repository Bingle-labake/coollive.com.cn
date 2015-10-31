/**
 * 签到
 */
function checkin(){
 var is_run = false;
 if(!is_run){
	 is_run = true;
	 $.ajax({
			type: "post",
			url: "/space/operation/checkin",
			dataType:"json",
			success: function(data){
			      if(!data['result']){
				    return false;
				  }else{
				    $("#checkin").removeAttr('onclick');
				    $("#checkin").html("已签到");
				    $("#credits").html(parseInt($("#credits").html())+Math.abs(data['act_score']));
				    $('#dateTip').fadeIn().animate({'top':'67'},200);
				    setTimeout(function(){$('#dateTip').fadeOut();},3000);
				  }
			}
		}); 
  }
}
