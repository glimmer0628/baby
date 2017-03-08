$(document).ready(function() {
  // 向数据库请求数据发送回页面所需初始数据
  $.ajax({
    url: 'expert.json',
    type: 'GET',
    success: function(data) {
      // 添加头部技师姓名、职位、头像等信息
      $('.name').html(data.name);
      $('.position').html(data.position);
      $('.summaryInfo img').attr('src', data.avatar);

      // 添加星星的方法
      appendStars(data.rating);

      // 根据数据添加资格认证图片,并设置容器宽度
      var imgLen = data.identImg.length;
      $('.scroller ul').width(imgLen * 119 - 6);
      data.identImg.forEach(function(item) {
        var tpl = '<li>' +
                    '<img src="' + item + '" alt="identImg" width="113" height="80">' +
                  '</li>';
        $(tpl).appendTo($('.scroller ul'));
      });
      if (myScroll) {
        myScroll.refresh();
      }

      // 添加技师简介
      $('.expertInfo p').html(data.summary);
      if (myScroll1) {
        myScroll1.refresh();
      }
    },
    error: function() {
      alert('啊哦，网络开小差了');
    }
  });
  var myScroll = new IScroll('.scroller', { scrollX: true, scrollY: false, mouseWheel: true });
  var myScroll1 = new IScroll('.expertInfo', {mouseWheel: true });
});

// 根据传入的参数展现星星的样子并添加至dom元素中
function appendStars(num) {
  for(var i = 0; i < num; i++) {
    $('<i class="star"></i>').appendTo($('.ratingContent'));
  }
  while(i < 5) {
    $('<i class="star no-star"></i>').appendTo($('.ratingContent'));
    i++;
  }
}