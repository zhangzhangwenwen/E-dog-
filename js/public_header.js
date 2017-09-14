$(function(){
	   var account=null
	   var strr=document.cookie
	   var crr=strr.split("; ")
	   for(var i=0;i<crr.length;i++){
	   	items=crr[i].split("=")
	   	if(items[0]=="username"){
	   	      account=items[1]
	   	}	
	   }
	   
	   if(account){	   	
	   	$("#login_n").html(account)
	   	$("#register_n").html("[注销]")
	   }else{
	   	$("#login_n").html("[登录]")
	   }
	   
	   if($("#register_n").html()=="[注销]"){
	   	   $("#register_n").click(function(){
	   	   	  setCookie("password","",-1)
	   	   	  setCookie("username","",-1)
	   	   	  setCookie("telenumber","",-1)
	   	   	  location.href="http://127.0.0.1/project/register.html"
	   	   })
	   }
		
	})