$(document).ready(function() {
  // 取出可提现金额
  var iCanWithdraw = (parseInt(localStorage.getItem('withdrawTotal')));
  $('.withdrawBtn').click(function() {
    // 判断用户提现金额是否超出当前用户存款额度
    if (iCanWithdraw < $('.inputPay').val() || $('.inputPay').val().length == 0) {
      alert('您最高可以提现' + iCanWithdraw + '元');
    } else {
      $.ajax({
        url: 'http://' + ip + '/tuina/api.php?s=/finance/weichart/userWithdraw',
        type: 'POST',
        data: {
          id: JSON.parse(sessionStorage.userInfo).openid,
          money: $('.inputPay').val()
        },
        success: function(data) {
          console.log(data);
        },
        error: function() {
          alert('本次提现不成功，请重试');
        }
      });
    }
  });
});