$(document).ready(function() {
  // 载入页面时向服务器请求数据
  $.ajax({
    url: "http://"+ip+"/tuina/api.php?s=/user/weichart/getTechnicianInfo",
    type: 'GET',
    success: function(data) {
      // 遍历数据 向模版中对应添加数据，并插入到dom元素中
      data.forEach(function(item) {
      	console.log(item);
        var tpl = '<li class="item border-1px" data-id="' + item.id + '">' +
                    '<img src="http://'+ip+'/tuina' + item.img_id + '" class="avatar" width="46" height="46" alt="avatar">' +
                    '<div class="detail">' +
                      '<div class="basicInfo">' +
                        '<span class="name">' + item.user_name + '</span>' +
                        '<span class="position">' + item.user_type + '</span>' +
                      '</div>' +
                      '<div class="stars">' +
                      '</div>' +
                      '<div class="summary">' + item.describe + '</div>' +
                    '</div>' +
                  '</li>';
        $(tpl).appendTo($('ul'));

        // 根据rating数来设置星星并添加至dom元素中
        appendStars(item.level, $('.stars').last());
        
      });
      // 根据手机窗口获取文字溢出的合适宽度
      $('.detail .summary').width($(window).width() - 85);
      
      //	跳转页面
			$(".item").click(function() {
				// 存expretid到sessionStorage
				sessionStorage.expertId = $(this).attr('data-id');
				window.location.href="../expert/expert.html";
			});
    },
    error: function() {
      alert('啊哦，网络开小差了');
    }
  });
  

});

// 根据传入的参数展现星星的样子并添加至dom元素中
function appendStars(num, box) {
  for(var i = 0; i < num; i++) {
    $('<i class="star"></i>').appendTo(box);
  }
  while(i < 5) {
    $('<i class="star no-star"></i>').appendTo(box);
    i++;
  }
}