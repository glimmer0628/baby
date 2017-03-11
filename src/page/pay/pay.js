$(document).ready(function() {
  // 通过请求数据库获取用户订单需要支付的金额
  $.ajax({
    url: 'http://' + ip + '/tuina/api.php?s=/order/weichart/getOrderMoney',
    type: 'POST',
    data: {
      id: sessionStorage.priceId
    },
    success: function(data) {
      console.log(data, sessionStorage.priceId);
      $('.title .right').html('￥' + data);
    }
  });
  // 读取会话存储中的single键名，判断是否应当将"余额支付"放出来
  
  // 如果从订单详情页进入本页面，则判断是否是单次疗程
  var single = sessionStorage.order_counts == '1' ? sessionStorage.setItem('single', 'true') : sessionStorage.setItem('single', 'false');
  if(sessionStorage.getItem('single') != 'true') {
  	$('.pay').first().remove();
  	$('.pay .right').addClass('default');
  }

  $('ul').delegate('.pay', 'click', function(e) {
    // 找到当前点击的元素，先将所有背景图变为未选中状态，后将
    // 点击的元素背景图片路径改变为选中状态
    $('ul .right').css({
      'background-image': 'url(6.png)'
    });
    var checkBox = $(e.currentTarget).find('.right');
    checkBox.css({
      'background-image': 'url(5.png)'
    });
  });
});