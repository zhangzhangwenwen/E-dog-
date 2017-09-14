$("#header_shop_cart").load("public_header.html #header",function(){
	  
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
	   	   	  location.href="register.html"
	   	   })
	   }
		
		
	$(".money").bind({
		mouseenter:function(){
			$(this).css("background","green")
		},
		mouseleave:function(){
			$(this).css("background","")
		},
		click:function(){	
			if(!account){
				alert("请先注册并登陆")
			}else{
			  location.href="order.html"	
			}
		}
	})

})
	
	
	
	
	$("#footer_shop_cart").load("public_footer.html #footer")
	
	$(".shop_cart_choose ul li").mouseover(function(){
		$(this).children().css("color","red").siblings().css("color","black")
		var index=$(this).index()
		$("#move").stop().animate({"left":index*130},200)
		
	})
	
	$(".shop_cart_choose ul li").mouseout(function(){
		$(this).children().css("color","black")
	})
	
	$(".shop_cart_choose ul li").click(function(){
		var index=$(this).index()
		$(".shop_cart_if").eq(index).css("display","block").siblings(".shop_cart_if").css("display","none")
		
	})
	
	
	
	
	
	$(function(){
		arr=getCookie("shoplist")
		var html = "";
		for(var i in arr){
			var shopinfo=arr[i]
            html+='<div class="shop-item clearfix">'+
					'<p><input type="checkbox" class="ck"/></p>'+
					'<p><img src="img/'+ shopinfo.src +'" alt="" /></p>'+
					'<p class="good_introduce">'+ shopinfo.name +'</p>'+
					'<p class="add_good" '+
						'data-id="'+ shopinfo.id +'" '+
						'data-price="'+ shopinfo.price +'" data-count="'+ shopinfo.count +'"'+
						'data-name="'+ shopinfo.name +'" data-src="'+ shopinfo.src +'"'+
						'>'+
						'<span class="updateCount" data-number="1">+</span>'+
						'<span class="shop-count">'+ shopinfo.count +'</span>'+
						'<span class="updateCount" data-number="-1">-</span>'+
					'</p>'+
					'<p><em class="sumPrice">'+ (shopinfo.count * shopinfo.price) +'元</em></p>'+
					'<p><i class="delBtn">[删除]</i></p>'+
					'<p><i class="saveBtn">[收藏]</i></p>'+
				'</div>'		
		}
		$(".shop_list").html(html)
		
		$(".ck").click(function(){
			payMoney()
		})
		
		//确定购物车里物品数量
		count=0
		brr=getCookie("shoplist")
		 for(var i in brr){
		 	count+=brr[i].count
		 }
		 
		 $("#shop_count").html(count)
	  
	  //点击收藏存cookie
	    $(".saveBtn").click(function(){
    	var drr=[]
    	var flag=true
    	var _json={
	    	id:$(this).parent().parent().find(".add_good").data("id"),
		    name:$(this).parent().parent().find(".add_good").data("name"),
		    src:$(this).parent().parent().find(".add_good").data("src"),
			price:$(this).parent().parent().find(".add_good").data("price"),
		    count:1
	    }
    	
    	var cookieInfo = getCookie("collect");
    	if( cookieInfo.length != 0 ){//表示cookie中有数据
			drr = cookieInfo;
			for(var i in drr){
				if(_json.id == drr[i].id && _json.name == drr[i].name){
					drr[i].count++;
					flag = false;
					break;
				}
			}
		}
    	if(flag){
    		drr.push(_json)	
    	}
    	
	  setCookie("collect",JSON.stringify(drr));
	  
	  getCollect()
	})
	  
	getCollect()
})
	 
 //	取出收藏的至收藏页面 
	function getCollect(){
	  err = getCookie("collect") 
	  var html1=""
	  var collectc=0
	  	for(var i in err){
			var shopinfo=err[i]
	    	 html1 += 
	    	         '<div class="collect_inf">'+
			    		'<img src="img/'+ shopinfo.src +'" alt="" class="f2"/>'+
			    		'<h2 class="f2">'+shopinfo.name+'</h2>'+
			    		'<div class="collect_inf_right"'+'data-id="'+shopinfo.id+'"'+'>'+
			    			'<span id="collect_price">￥'+shopinfo.price+'</span>'+
			    			'<span id="add_cart">加入购物车</span>'+
			    			'<span id="delete">删除</span>'+
	    				'</div>'+
	    			'</div>'
			
			
		}
	      
		  $(".my_collect").html(html1)  
		  $("#collect_count").html(err.length)
	}
	
	
	
	
	//删除收藏夹中内容
	$(".my_collect").on("click","#delete",function(){

		var id=$(this).parent().data("id")
		for(var i in err){
		  if(id==err[i].id){
		  	err.splice(i,1)
		  	setCookie("collect",JSON.stringify(err))
		   $(this).parent().parent().remove()
		    $("#collect_count").html(err.length)
		  }
		}
	})
	
	
	
	
	//全选
	$("#selectAll").click(function(){
		$(".ck").prop("checked",$("#selectAll").prop("checked"))
		payMoney()
	})
	
	//删除
	$(".shop_list").on("click",".delBtn",function(){
		var id=$(this).parent().parent().find(".add_good").data("id")
		var price=$(this).parent().parent().find(".add_good").data("price")
		for(var i in arr){
			if(id==arr[i].id&&price==arr[i].price){
				arr.splice(i,1)
			    setCookie("shoplist",JSON.stringify(arr))
			    $(this).parent().parent().remove()
			}
		}
	})
	
	//加减操作
	$(".shop_list").on("click",".updateCount",function(){
		var sign=$(this).html()
		var id=$(this).parent().parent().find(".add_good").data("id")
		var price=$(this).parent().parent().find(".add_good").data("price")
	    
	    var num=$(this).parent().parent().find(".shop-count").html()
	    if(sign=="-"&&num==1){
	    	return
	    }
	    for(var i in arr){
	    	if(arr[i].id==id&&arr[i].price==price){
	    		sign=="+"?arr[i].count++:arr[i].count--; 		
	    		setCookie("shoplist",JSON.stringify(arr))
	    		$(this).parent().parent().find(".shop-count").html(arr[i].count)
	    		$(this).parent().parent().find(".sumPrice").html(arr[i].count*arr[i].price+"元")
	    	}
	    }
	    
	    payMoney()
	})
	
	
   function payMoney(){
   	 money=0
   	 count=0
   	$(".ck:checked").each(function(){
   		count+=parseInt($(this).parent().parent().find(".shop-count").html())
   		money+=parseInt($(this).parent().parent().find(".sumPrice").html())
   	})
   	$("#total_count").html("("+count+")")
   	$("#count").html("￥"+money)
   	setCookie("totalMoney",money)
   }
	
	
	
	
	
	
	
	
	
