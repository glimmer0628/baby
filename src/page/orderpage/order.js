$("").ready(function() {
	
	var cObj = {};//存放取消的
	oAjax(1);
//	预约订单
	$(".order_top ul li").each(function(i) {
		$(this).click(function() {
			$(".order_top ul li").css('color','#323232');
			$(this).css('color','#F27C7C');
			
			$(".order_contant div").remove();
			
		});
		
	});
	$(".order_top ul li").eq(0).click(function() {
		oAjax(1);
	});
	$(".order_top ul li").eq(1).click(function() {
		oAjax(0);
	});
	$(".order_top ul li").eq(2).click(function() {
		oAjax(3);
	});
	$(".order_top ul li").eq(3).click(function() {
		oAjax(4);
	});
	$(".order_top ul li").eq(4).click(function() {
		oAjax(5);
	});
	function oAjax(jsonnum) {
		if(jsonnum==1){
			
			var btnDom="<button class='btn_del'>取消</button>";
			
		}else if(jsonnum==0){
			
			var btnDom="<button class='btn_del'>取消</button><button class='btn_pay'>付款</button>";
		}else if(jsonnum==3){
			
			var btnDom="<button class='btn_com'>评价</button>";
		}else{
			var btnDom="";
		}
		$.ajax({
                url:'http://' + ip + '/tuina/api.php?s=/order/weichart/getUserOrder',
                type:"post",
                dataType:"json",
                data:{
                	id:JSON.parse(sessionStorage.userInfo).openid,
                	status:jsonnum
                },
                success: function(data) {
                	console.log(data);
                	$(data).each(function(i) {
                		var order_top="<div class='order_number'>工单号："+data[i].order_num+"</div>"+btnDom;
                		var order_bottom="<div>地点："+data[i].address_id+"</div><div>预约时间：<span>"+data[i].start_time+"</span></div>";
                		$('.order_contant').append("<div class='order' order_price=" + data[i].order_money + " order_id="+data[i].id+" order_counts="+data[i].order_counts+"><div class='orderTop'>"+order_top+"</div><div class='orderBottom'>"+order_bottom+"</div></div>");
                	});
            		
                		//	取消
						$('.btn_del').click(function(e) {
							e.stopPropagation();
							var id=$(this).parents('.order').attr('order_id');
							console.log(id);
							$.ajax({
				                url:'http://' + ip + '/tuina/api.php?s=/order/weichart/cancelOrder',
				                type:'post',
				                data:{
				                	id:id
				                },
				                success:function(data){
									 console.log(data);
									 window.location.reload();
				                }
				            });
					                
					        // $(this).parents('.order').css('display','none');
					    });
					    //	付款
						$('.btn_pay').click(function(e) {
							e.stopPropagation();
              var orderid=$(this).parents('.order').attr('order_id');
							var order_counts=$(this).parents('.order').attr('order_counts');
              sessionStorage.order_counts=order_counts;
							sessionStorage.priceId=orderid;

			        window.location.href="../pay/pay.html";
					   });
						//	评价
						$('.btn_com').click(function(e) {
							e.stopPropagation();
							var orderid=$(this).parents('.order').attr('order_id');
							cObj = {
					                orderID:data[orderid].number
					                };
					        cAjax(cObj);  
					        window.location.href="../commentpage/comment.html";
					    });
					    //点击查看订单详情
					    $(".order").click(function() {
					    	var orderid=$(this).attr('order_id');
					    	var order_counts=$(this).attr('order_counts');
					    	
					    	sessionStorage.orderid=orderid;
					    	sessionStorage.order_counts=order_counts;
				    		window.location.href="../orderDetail/orderDetail.html";
					    });
                	
                }
                     
            });
	}
	
	//          更新订单的ajax
            function cAjax(obj) {
            $.ajax({
                url:'',
                type:'get',
                data:obj,
                success:function(data){
					 //$(this).parents('.order').css('display','none');
                }
            });
            
          }

	});
