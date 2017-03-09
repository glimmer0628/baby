$("").ready(function() {
	//		个人中心头像和昵称
	var userInfo=JSON.parse(sessionStorage.userInfo);
	$(".my_touxiang").attr('src',userInfo.img_id);
	$(".my_name").html(userInfo.nickname);

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
