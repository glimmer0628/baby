$("").ready(function() {
	var num=1;
	var cObj = {};//存放取消的
	oAjax(num);
//	预约订单
	$(".order_top ul li").each(function(i) {
		$(this).click(function() {
			$(".order_top ul li").css('color','#323232');
			$(this).css('color','#F27C7C');
			num=i+1;
			$(".order_contant div").remove();
			oAjax(num);
		});
	});

	function oAjax(jsonnum) {
		if(jsonnum==1||jsonnum==2){
			
			var btnDom="<button class='btn_del'>取消</button>";
			
		}else if(jsonnum==3){
			btn='评价';
			var btnDom="<button class='btn_com'>评价</button>";
		}else{
			var btnDom="";
		}
		$.ajax({
                url:"order"+jsonnum+".json",
                type:"get",
                dataType:"json",
                success: function(data) {
                	console.log(data);
                	$(data).each(function(i) {
                		var order_top="<div class='order_number'>工单号："+data[i].number+"</div>"+btnDom;
                		var order_bottom="<div>地点："+data[i].address+"</div><div>预约时间：<span>"+data[i].time1+"</span>&nbsp;&nbsp;<span>"+data[i].time2+"</span></div>";
                		$('.order_contant').append("<div class='order' order_id="+i+"><div class='orderTop'>"+order_top+"</div><div class='orderBottom'>"+order_bottom+"</div></div>");
                	
                	//	取消
						$('.btn_del').click(function() {
							var orderid=$(this).parents('.order').attr('order_id');
							cObj = {
					                            orderID:data[orderid].number
					                };
					                cAjax(cObj);  
					                $(this).parents('.order').css('display','none');
					    });
					//	评价
						$('.btn_com').click(function() {
							var orderid=$(this).parents('.order').attr('order_id');
							cObj = {
					                            orderID:data[orderid].number
					                };
					                cAjax(cObj);  
					                window.location.href="../commentpage/comment.html";
					    });
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
