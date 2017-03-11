$(document).ready(function() {
	// 个人中心头像和昵称
	var userInfo=JSON.parse(sessionStorage.userInfo);
	$(".avatar").attr('src',userInfo.img_id);
	$(".nickName").html(userInfo.nickname);
	
	var openid = JSON.parse(sessionStorage.userInfo).openid;
	$.ajax({
		type:"post",
		url:"http://" + ip + "/tuina/api.php?s=/user/Weichart/getUserInfo",
		async:true,
		data: {
			id: openid
		},
		success: function(data) {
			// 家长姓名
		    $('.detail').get(0).innerHTML = data.address.user_name;
		    // 我的手机号
		    $('.detail').get(1).innerHTML = data.address.mobile;
		    // 宝宝姓名
		    console.log(data);
		    $('.detail').get(2).innerHTML = data.userInfo.baby_name;
		    // 宝宝性别
		    $('.detail').get(3).innerHTML = data.userInfo.sex == '0' ? '男' : '女';
		    // 宝宝生日
		    var birthday = data.userInfo.birth_date.split('-');
		    $('.detail').get(4).innerHTML = birthday[0] + '-' + birthday[1] + '-' + birthday[2];
		},
		error: function(err) {
			alert('啊哦，网络开小差了');
		}
	});
	
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
    
  	window.location.href="../addNewpage/addNew.html?default=true&addressid="+parentInfo.id;
  });
  $('.parentInfo:nth-of-type(2)').click(function() {
    // 跳转到宝宝信息的修改页
  	window.location.href="../babyInfo/babyInfo.html";
  });
});