$(document).ready(function() {
  // 用iScroll使页面可滑动
  myScroll = new IScroll('.balanceWrapper', { scrollX: true, scrollBars: true, fadeScrollbars: true, zoom: true});
  // 页面载入时向后台请求基本数据
  $.ajax({
    url: 'balanceDetail.json',
    type: 'get',
    success: function(data) {
      // 请求来的数据为一个数组，遍历数组，将数据添加到模版中
      data.forEach(function(item) {
        var tpl = '<li class="border-1px">' +
                    '<div class="balanceLeft">' +
                      '<span class="topUp">余额充值:<span class="count">' + item.topUp + '</span></span>' +
                      '<div class="time">' + item.time + '</div>' +
                    '</div>' +
                    '<div class="balanceRight">余额:<span class="count">' + item.balance + '</span></div>' +
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