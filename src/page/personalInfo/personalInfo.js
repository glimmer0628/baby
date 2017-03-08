$(document).ready(function() {
  // 进入页面时读取本地存储
  if (localStorage.getItem('parentInfo')) {
    // 读取家长信息默认数据
    var parentInfo = JSON.parse(localStorage.getItem('parentInfo'));

    // 家长姓名
    $('.detail').get(0).innerHTML = parentInfo.name;
    // 我的手机号
    $('.detail').get(1).innerHTML = parentInfo.phone;
  }
  
  if (localStorage.getItem('babyInfo')) {
    // 读取宝宝信息默认数据
    var babyInfo = JSON.parse(localStorage.getItem('babyInfo'));
    console.log(babyInfo);

    // 宝宝姓名
    $('.detail').get(2).innerHTML = babyInfo.name;
    // 宝宝性别
    $('.detail').get(3).innerHTML = babyInfo.sex;
    // 宝宝生日
    var birthday = babyInfo.birth.split(',');
    $('.detail').get(4).innerHTML = birthday[0] + '-' + birthday[1] + '-' + birthday[2];
  }

  // 读取本地存储的数据
  $('.parentInfo:nth-of-type(1)').click(function() {
    // 跳转页面，读取默认地址的数据
  	window.location.href="../addNewpage/addNew.html?default=true";
  });
  $('.parentInfo:nth-of-type(2)').click(function() {
    // 跳转到宝宝信息的修改页
  	window.location.href="../babyInfo/babyInfo.html";
  });
});