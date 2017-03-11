$("").ready(function() {
	
	var cObj = {};//存放传给后台的状态参数
	oAjax();
//	预约订单
	$(".order_top ul li").each(function(i) {
		$(this).click(function() {
			$(".order_top ul li").css('color','#323232');
			$(this).css('color','#F27C7C');
			
			$(".order_contant div").remove();
			
			oAjax(i);
		});
	});
	
	function oAjax(jsonnum) {
		$.ajax({
                url:'http://' + ip + '/tuina/api.php?s=/order/weichart/getUserDistribOrder ',
                type:"post",
                dataType:"json",
                data:{
                	id:JSON.parse(sessionStorage.userInfo).openid,
                	status:jsonnum
                },
                success: function(data) {
                	console.log(data);
                	$(data).each(function(i) {
                		$('.order_contant').append("<div class='order' order_id="+i+"><span class='orderid'>单号："+data[i].order_id+"</span><span class='ordermoney'>"+data[i].commision+"元</span></div>");
                	
                	});
                	
                }
                     
        });
	}
});
