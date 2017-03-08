$("").ready(function() {
	var num=1;
	var cObj = {};//存放传给后台的状态参数
	oAjax(num);
//	预约订单
	$(".order_top ul li").each(function(i) {
		$(this).click(function() {
			$(".order_top ul li").css('color','#323232');
			$(this).css('color','#F27C7C');
			num=i+1;
			$(".order_contant div").remove();
			cObj = {
					  canshu:num
					 };
			oAjax(num,cObj);
		});
	});
	
		function oAjax(jsonnum,obj) {
		
		$.ajax({
                url:"distOrder"+jsonnum+".json",
                type:"get",
                data:obj,
                dataType:"json",
                success: function(data) {
                	console.log(data);
                	$(data).each(function(i) {
                		
                		$('.order_contant').append("<div class='order' order_id="+i+"><span class='orderid'>单号："+data[i].number+"</span><span class='ordermoney'>"+data[i].money+"元</span></div>");
                	
                	});
                	
                }
                     
            });
	}
});
