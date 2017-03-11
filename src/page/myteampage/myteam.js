$("").ready(function() {
	
	$.ajax({
                url:'http://' + ip + '/tuina/api.php?s=/order/weichart/getUserTeam',
                type:"post",
                dataType:"json",
                data:{
                	id:JSON.parse(sessionStorage.userInfo).openid
                },
                success: function(data) {
                	console.log(data);
                	$(data).each(function(i) {
                		$(".container").append("<div class='myTeam'><img src='"+data[i].img_id+"' /><span class='name'>"+data[i].nickname+"</span><span class='xiaxian'>"+data[i].type+"</span></div>");
                	});
                }
            
           });
});
