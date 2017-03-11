$("").ready(function() {
	//		个人中心头像和昵称
	var userInfo=JSON.parse(sessionStorage.userInfo);
	$(".my_touxiang").attr('src',userInfo.img_id);
	$(".my_name").html(userInfo.nickname);

    $.ajax({
            url:'http://' + ip + '/tuina/api.php?s=/order/weichart/getUserBrokerage',
            type:"post",
            dataType:"json",
            data:{
            	id:JSON.parse(sessionStorage.userInfo).openid
            },
            success: function(data) {
            	
                console.log(data);
           		$(".money1").html(data.total_brokerage);
           		$(".money2").html(data.brokerage);
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
