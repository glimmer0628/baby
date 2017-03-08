$(document).ready(function() {
  // 从本地存储中获取用户当前余额
  $('.title .right').html('￥' + localStorage.price);
  // 读取会话存储中的single键名，判断是否应当将"余额支付"放出来
  console.log(sessionStorage.getItem('single'));
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