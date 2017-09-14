$(function(){
	    $("section").css("background","url(img/log"+Math.floor(Math.random()*3+1)+".jpg)")
	})
	
	
	$(".login_left ul li").click(function(){
		var index=$(this).index()
		$(this).css("border-bottom","1px solid green").siblings().css("border-bottom","1px solid #eee")
	    $(".login_style").eq(index).css("display","block").siblings(".login_style").css("display","none")
	})
	
	
	
	//var arr=["yz1.png","yz2.png","yz3.png","yz4.png","yz5.png"]
	function rand(min,max){
		return Math.floor(Math.random()*(max-min+1)+min)
	}
	
	
	function checkIndex(){
	if(flag){
			return true
	}else{
		
           return  false
       }

	}
	
	
	
    $("#btn").click(function(){
	  flag=false
	  var str=document.cookie
      var arr=str.split("; ")
       for(var i=0;i<arr.length;i++){
       	   item = arr[i].split("=")
       	    if(item[0]=="username"){
       	    	name=item[1]
       	    	console.log(name)
       	    }
       	    if(item[0]=="password"){
       	    	pass=item[1]
       	    	console.log(pass)
       	    }
       	    if(item[0]=="telenumber"){
       	    	telephone=item[1]
       	    	console.log(telephone)
       	    }
       }
       
       if(telephone==$("#username").val()&&pass==$("#passward").val()){
       	     flag=true
       }
    })
    
    
    