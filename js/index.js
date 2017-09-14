    $("#header_index").load("public_header.html #header")
	$("#search_index").load("public_header.html #search",function(){
	
		count=0
		brr=getCookie("shoplist")
		 for(var i in brr){
		 	count+=brr[i].count
		 }
		 
		 $("#total").html(count)
	
	    $(".tele").click(function(){
	    	location.href="http://127.0.0.1/project/shop_cart.html"
	    })
	    
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
	
	
	
	$("#footer_index").load("public_footer.html #footer")
	
	$(".banner_right img").hover(function(){
		$(this).stop().animate({"right":10},500)
	},function(){
		$(this).stop().animate({"right":0},500)
	})
	


    var timer=setInterval(autoPlay,3000)
    var index1=0
    var arr=["black","#8500cd","#dfcba8","black","#d9f3f4"]
    function autoPlay(){
    	index1++
    	if(index1==5){
    		index1=0		
    	}
    	$(".list ul li").eq(index1).css({"background":"white","color":"black"})
    	                          .siblings().css({"background":"#999","color":"white"})
    	$(".list>img").eq(index1).show()
    	                        .siblings("img").hide()    
    	$("#banner").css("background",arr[index1])
    	$(".classify").css("background",arr[index1])
    }
     
    
     $(".list ul li").mouseenter(function(){
     	clearInterval(timer)
     	index1=$(this).index()-1
     	autoPlay()
     })
     
     $(".list ul li").mouseenter(function(){
     	 timer=setInterval(autoPlay,3000)
     })
     
     
     
     
     
     
       $(function(){
	       	$(".classify ").css("background","black")
	       	$(".classify div").eq(1).css({"opacity":0.5,"color":"black"})
       })
    
      $(".classify div").bind("mouseover",function(){
	      	$(this).css({"opacity":0.5,"color":"black"}).siblings().css({"opacity":"","color":"black"})
			var index=$(this).index()
		    $(".nav_select").eq(index).css("display","block").siblings(".nav_select").css("display","none")
      })
     
     
     
     
    $(".main_top ul li").mouseenter(function(){
    	var index=$(this).index()
    	$(this).children().addClass("active").siblings().removeClass("active")
    	$(".main_right .main_right_list").children().eq(index).css("display","block").siblings().css("display","none")
  
    })

   


    $(".main_top ul li").mouseleave(function(){
    	$(this).children().removeClass("active")
    })
    
    $(".good_classify ul li").mouseenter(function(){
    	$(this).css({"background-color":"#eee","border-top":"1px greenyellow solid","border-bottom":"1px greenyellow solid"})
        $(".good_classify .good_classify_detail").css("display","block")
    })
    
	 $(".good_classify ul li").mouseleave(function(){
    	$(this).css({"background-color":"","border-bottom":"1px #eee dashed","border-top":"none"})
	 })
	 
	$(".good_classify .good_classify_detail").mouseleave(function(e){
      $(".good_classify .good_classify_detail").css("display","none")
	})
	
	
	 	





   $(function(){
   	   var data={
   	       arr:[], 
   	       str:""
   	   }
		$.ajax({
			type:"get",
			url:"data.json",
			success : function(res){
				var html = "";
				var html1=""
				var html2=""
				var html3=""
				var html4=""
				for (var  i in  res) {
					if(res[i].name=="进口狗粮"){
						for(var j in res[i].list){
							var ch = res[i].list[j];
							html += `<li><a href="detail.html?pid=${ch.id}&cname=${i}">
							<img src="img/${ch.src}">
							<p>${ch.name}</p><p>￥${ch.price}</p></a></li>`;
						}
					}
					
					if(res[i].name=="国产狗粮"){
						for(var j in res[i].list){
							var ch = res[i].list[j];
							html1 += `<li><a href="detail.html?pid=${ch.id}&cname=${i}">
							<img src="img/${ch.src}">
							<p>${ch.name}</p><p>￥${ch.price}</p></a></li>`;
						}
					}
					if(res[i].name=="散装狗粮"){
						for(var j in res[i].list){
							var ch = res[i].list[j];
							html2 += `<li><a href="detail.html?pid=${ch.id}&cname=${i}">
							<img src="img/${ch.src}">
							<p>${ch.name}</p><p>￥${ch.price}</p></a></li>`;
						}
					}
					
					if(res[i].name=="处方狗粮"){
						for(var j in res[i].list){
							var ch = res[i].list[j];
							html3 += `<li><a href="detail.html?pid=${ch.id}&cname=${i}">
							<img src="img/${ch.src}">
							<p>${ch.name}</p><p>￥${ch.price}</p></a></li>`;
						}
					}
					if(res[i].name=="抢购"){
						for(var j in res[i].list){
							var ch = res[i].list;
							var bh=i
							data.arr=ch
							data.str=i
							var html4 = template("list",data);
						    $(".qianggou_x").html(html4)
//							html4 += `<li>
//						            	<a href="detail.html?pid=${ch.id}&cname=${i}">
//				            			<img src="img/${ch.src}">
//				            			<p>${ch.name}</p>
//				            			<h6>￥${ch.price}</h6>
//				            			</a>
//				            			<h5></h5>
//				            			<h3>提醒我</h3>
//          		                 </li>`;
						}
					}

				}
				
                 
				$(".main_right_list_1").html( html );
				$(".main_right_list_2").html( html1 );
				$(".main_right_list_3").html( html2);
				$(".main_right_list_4").html( html3);

			}
		});
	})
   
   
   
   function diff(start,end){
		return Math.abs(end.getTime()-start.getTime())/1000;
	}
	
	var now=new Date();
	var end=new Date("2017-9-10 00:00:00")
	var t=diff(now,end)
	showTime()
	function showTime(){
		var h=parseInt(t/3600);
		var m=parseInt((t-h*3600)/60);
		var s=parseInt(t-m*60-h*3600);
	    $(".hour_1").html(parseInt(h/10))
	    $(".hour_2").html(h%10)
	    $(".minute_1").html(parseInt(m/10))
	    $(".minute_1").html(m%10)
	    $(".second_1").html(parseInt(s/10))
	    $(".second_2").html(s%10)
	    
	}
	
	
	var timerDiscount=setInterval(fn,1000)
	function fn(){
		t--
		if(t<0){
			$(".everyday_left").html("商品下架")
			clearInterval(timerDiscount)
		}else{
			
		showTime()
		}
	}
	
	
	var timerLunBo=setInterval(lunbo,3000)
	var indexT=0
	function lunbo(){
		indexT++
		if(indexT==3){
			indexT=0
		}
		 $(".news_inner").animate({"top":-153*indexT},1000)	
		
	}
   
   
   
   
   
   
   