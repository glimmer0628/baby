$(document).ready(function() {
  // 用iScroll使页面可滑动
  myScroll = new IScroll('.balanceWrapper', { scrollX: true, scrollBars: true, fadeScrollbars: true, zoom: true});
  // 页面载入时向后台请求基本数据
  $.ajax({
    url: 'http://' + ip + '/tuina/api.php?s=/user/weichart/getUserAmountInfo',
    type: 'POST',
    data: {
    	id: JSON.parse(sessionStorage.userInfo).openid
    },
    success: function(data) {
    	console.log(data);
      // 请求来的数据为一个数组，遍历数组，将数据添加到模版中
      data.forEach(function(item) {
        var tpl = '<li class="border-1px">' +
                    '<div class="balanceLeft">' +
                      '<span class="topUp">' + item.status + ':<span class="count">' + item.money + '</span></span>' +
                      '<div class="time">' + item.create_time + '</div>' +
                    '</div>' +
                    '<div class="balanceRight">余额:<span class="count">' + item.amount + '</span></div>' +
                  '</li>';
        // 将模版添加到页面中
        $(tpl).appendTo($('.balanceWrapper ul'));
        myScroll.refresh();
      });
    },
    error: function() {
      alert('啊哦，网络开小差了！');
    }
  });
});