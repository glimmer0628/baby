$(document).ready(function() {
  $('.optionContant li').first().click(function() {
    window.location.href = '../recharge/recharge.html';
  });
  $('.optionContant li').last().click(function() {
    window.location.href = '../balanceDetail/balanceDetail.html';
  });
});