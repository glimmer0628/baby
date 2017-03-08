$("").ready(function() {
	//		个人中心头像和昵称
		$.ajax({
                url:"myname.json",
                type:"get",
                dataType:"json",
                success: function(data) {
                	
                    console.log(data);
               		$(".my_touxiang").attr('src',data.img);
               		$(".my_name").html(data.name);
                },
                error: function() {
         		alert('失败');
   				}
            });
            
        $.ajax({
                url:"money.json",
                type:"get",
                dataType:"json",
                success: function(data) {
                	
                    console.log(data);
               		$(".money1").html(data.heji);
               		$(".money2").html(data.tixian);
                },
                error: function() {
         		alert('失败');
   				}
            });
            
	    //			跳转页面
		$(".tixianbt").click(function() {
			window.location.href="../withdraw/withdraw.html";
		});
});
