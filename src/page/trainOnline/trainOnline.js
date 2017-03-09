$(document).ready(function() {
  // 页面加载进来时先向服务器请求数据
  $.ajax({
    url: 'http://'+ip+'/tuina/api.php?s=/system/weichart/getOnlineTitle',
    type: 'GET',
    success: function(data) {
      data.forEach(function(item) {
        // 根据模版生成“在线培训”的html数据
        var tpl = '<li class="border-1px" data-id="' + item.id + '">' +
                    '<img src="http://'+ip+'/tuina' + item.img_url + '" width="110" height="74" alt="trainOnline" class="thumbImg">' +
                    '<div class="abstract">' +
                      '<h3 class="title">' + item.content_name + '</h3>' +
                      '<span class="time">' + item.create_time + '</span>' +
                    '</div>' +
                  '</li>';
        $(tpl).appendTo($('.wrapper'));
      });
      
      // 点击每一条信息时触发的事件
      $('li').click(function(e) {
      	// 获取到点击条目信息的data-id
      	var e_dataId = $(e.target).parents('li').attr('data-id');
      	
      	// 将获取到的data-id post到后台，后台返回需要跳转的链接
      	$.ajax({
      		url: 'http://'+ip+'/tuina/api.php?s=/system/weichart/getOnlineUrl',
      		type: 'POST',
      		data: {
      			id: e_dataId
      		},
      		success: function(data) {
      			// 拿到链接，跳转页面
      			window.location.href = 'http://' + data.content_url;
      		},
      		error: function() {
      			alert('啊哦，网络开小差了');
      		}
      	});
      });
    }
  });
});