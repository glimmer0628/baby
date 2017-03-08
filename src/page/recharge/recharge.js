$(document).ready(function() {

  // 页面载入时向后台请求基本数据
  $.ajax({
    url: './recharge.json',
    type: 'get',
    success: function(data) {
      // 遍历数组，循环出有几个金额，就向页面添加几个这样的元素
      // 显示我的余额数据
      $('.banlance').html('￥' + data.balance);

      // 套餐选项选择
      data.topUp.forEach(function(item, index) {
        // 默认第一个金额为选中状态，为sumContainer和discoun添加
        // active类名
        if (index === 0) {
          var chooseCount = '<div class="sumContainer active">' +
                              '<div class="sum">' + item.chargeCount +'元</div>' +
                              '<div class="discount active">赠送' + item.discount + '元</div>' +
                            '</div>';
          $('.pay .money').html(item.chargeCount);
        } else {
          var chooseCount = '<div class="sumContainer">' +
                              '<div class="sum">' + item.chargeCount +'元</div>' +
                              '<div class="discount">赠送' + item.discount + '元</div>' +
                            '</div>';
        }
        $(chooseCount).appendTo($('.chooseSum'));
      });
    },
    error: function() {
      alert('啊哦，网络开小差了');
    }
  });
  
  $('.chooseSum').delegate('.sumContainer', 'click', function(e) {
    // 当点击时先移除样式类
    $('.sumContainer').removeClass('active');
    $('.sumContainer .discount').removeClass('active');
    // 再向点击的元素添加样式类
    $(e.currentTarget).addClass('active');
    $($(e.currentTarget).find('.discount')[0]).addClass('active');
    // 后根据选择的内容选项添加应付金额
    var payStr = $(e.currentTarget).find('.sum')[0].innerHTML;
    $('.pay .money').html(payStr.substring(0,payStr.length-1));
  });
});