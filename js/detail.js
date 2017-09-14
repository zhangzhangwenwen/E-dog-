     $("#header_detail").load("public_header.html #header",function(){
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
	
	$("#search_detail").load("public_header.html #search")
	$("#search_nav").load("index.html #index_nav",function(){
		
		$(".dog_select").css("display","none")
		 $(".classify div").bind("mouseover",function(){
		 	
	      $(this).css({"background":"green","color":"black"}).siblings().css({"background":"","color":""})
	      var index=$(this).index()
		 $(".nav_select").eq(index).css({"display":"block","zIndex":999}).siblings(".nav_select").css("display","none")
      })
		
		$(".dog_select").bind("mouseout",function(){
			$(".dog_select").css("display","none")
		})
		
		
		
	})
	
	
	$("#footer_detail").load("public_footer.html #footer")
    var str = location.href;
	var arr = str.split("?")[1];
	var pid = arr.split("&")[0].split("=")[1];
	var cname = arr.split("&")[1].split("=")[1];
	$.ajax({
		type:"get",
		url:"data.json",
		success : function(res){
			var str = "";
			var str1=""
			var str2=""
			for(var i in res[cname].list){
				if( pid == res[cname].list[i].id ){//找到了要显示的商品详情
					str = `<div class="small">
								<img src="img/${res[cname].list[i].bsrc}" id="smallImage">
								<div class="mask"></div>
					       </div>
					       <div class="big">
								<img src="img/${res[cname].list[i].bsrc}" id="bigImage">
					       </div>`;	
					str1= `<p id="name">${res[cname].list[i].name}</p>
				          <h5>
					        <p>市场价:<del>${res[cname].list[i].marketprice}</del></p>
					        <p>E宠价:<span>￥</span><span>${res[cname].list[i].price}</span></p>
				         </h5>
				         <span id="information" data-id=${res[cname].list[i].id}  data-name=${res[cname].list[i].name} data-src=${res[cname].list[i].bsrc} data-price=${res[cname].list[i].price}   style="display:none"></span>
			             <p id="solded">已售：<span>${res[cname].list[i].solded}</span>包&nbsp;&nbsp;&nbsp;&nbsp;互动：查看评价<span>(14858)&nbsp;&nbsp;&nbsp;&nbsp;赠送：最多0E宠币</span></p>`           
				
				     str2=`<img src="img/${res[cname].list[i].bsrc}">`
				}
			}
			$(".detail_box").html(str);
		    $(".detail_right").prepend(str1)
		    $(".bottom_center").html(str2)
		    $(".small").mouseover(function(){
				$(".mask").css("display","block")
				$(".big").css("display","block")
			})
			$(".small").mouseout(function(){
				$(".mask").css("display","none")
				$(".big").css("display","none")
			})
		    $(".small").mousemove(function(e){
		  	    var e=e||event
		  	    var x=e.pageX - $(".detail_box").offset().left - $(".mask").width()/2;
		  	    var y=e.pageY - $(".detail_box").offset().top - $(".mask").height()/2;
		  	    var maxLeft= $(".detail_box").width() - $(".mask").width();
		     	var maxTop = $(".detail_box").height() - $(".mask").height();
		        x = x < 0 ? 0 : ( x > maxLeft ? maxLeft : x );
				y = y < 0 ? 0 : ( y > maxTop ? maxTop : y );
		  	   
		  	   $(".mask").css("left",x)
			   $(".mask").css("top",y)
		  	
		  	    var bigImgLeft =  x * $("#bigImage").width() / $("#smallImage").width();
				var bigImgTop =  y * $("#bigImage").height() / $("#smallImage").height();
				$("#bigImage").css("left",-bigImgLeft);
				$("#bigImage").css("top",-bigImgTop );
		  })
		}
	});

	 //详情页加减
	$(".datail_updateCount").click(function(){
		var sign=$(this).html()
		var id=$(this).parent().data("id")
	    var num=$(this).parent().find(".datail_shop-count").html()
	
		if(sign=="-"&&num==1){
			return 
		}
	   sign=="+"?num++:num--
	// arr[i].count+=num
	   $(this).parent().find(".datail_shop-count").html(num)
	
	})
	
	
    //加入购物车
    $("#add_to_shopcart").click(function(){
	    var nums=Number($(".datail_shop-count").html())
        var arr=[]
    	var flag=true
    	var _json={
	    	id:$("#information").data("id"),
		    name:$("#information").data("name"),
		    src:$("#information").data("src"),
			price:$("#information").data("price"),
		    count:nums
	    }
	  
    	var cookieInfo = getCookie("shoplist");
    	if( cookieInfo.length != 0 ){//表示cookie中有数据
			arr = cookieInfo;
			for(var i in arr){
				if(_json.id == arr[i].id && _json.name == arr[i].name){
					arr[i].count+=nums
					flag = false;
					break;
				}
			}
		}
    	if(flag){
    		arr.push(_json)	
    	}
    	   
	    setCookie("shoplist",JSON.stringify(arr));
		var f = confirm("是否继续购买?确定--继续购买，取消---去购物车结算");
	    if( !f ){
			location.href = "shop_cart.html";
	    }else{
			location.href = "index.html";
	    }

    })



 




 


