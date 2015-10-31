//CharMode函数  
//测试某个字符是属于哪一类.  
function CharMode(iN){  
if (iN>=48 && iN <=57) //数字  
	return 1;  
	if (iN>=65 && iN <=90) //大写字母  
	return 2;  
	if (iN>=97 && iN <=122) //小写  
	return 4;  
	else  
	return 8; //特殊字符  
}  

//bitTotal函数  
//计算出当前密码当中一共有多少种模式  
function bitTotal(num){  
	modes=0;  
	for (i=0;i<4;i++){  
	if (num & 1) modes++;  
	num>>>=1;  
}  
return modes;  
}  

//checkStrong函数  
//返回密码的强度级别  

function checkStrong(sPW){  
	if (sPW.length<=6)  
	return 0; //密码太短  
	Modes=0;  
	for (i=0;i<sPW.length;i++){  
	//测试每一个字符的类别并统计一共有多少种模式.  
	Modes|=CharMode(sPW.charCodeAt(i));  
	}  
return bitTotal(Modes);  

}  

//pwStrength函数  
//当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色  

function pwStrength(pwd){  
	var cls = '';  
	if (pwd==null||pwd==''){  
	    cls = '';
	}  
	else{  
		S_level=checkStrong(pwd);
		switch(S_level) {  
		case 0:  
		    cls = "c1";
		case 1:  
			cls = "c1";
		   break;  
		case 2:  
			cls = "c2"; 
			break;  
		default:  
		    cls = "c3";
	}	
}
$('.pwdstrength i').removeClass();
$('.pwdstrength i').addClass(cls);
return;  
}  