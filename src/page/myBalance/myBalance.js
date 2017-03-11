$(document).ready(function() {
	// 向后台请求我的余额数据
	$.ajax({
		url: 'http://' + ip + '/tuina/api.php?s=/user/weichart/getUserAmount',
		type: 'POST',
		data: {
			id: JSON.parse(sessionStorage.userInfo).openid
		},
		success: function(data) {
			$('.balance').html(data.amount);
		},
		error: function() {
			alert('啊哦，网络开小差了');
		}
	});
  $('.optionContant li').first().click(function() {
    window.location.href = '../recharge/recharge.html';
  });
  $('.optionContant li').last().click(function() {
    window.location.href = '../balanceDetail/balanceDetail.html';
  });
});