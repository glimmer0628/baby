$(document).ready(function() {
  // 读取本地存储，如果有数据则调取数据先进行显示
  var babyInfo = JSON.parse(localStorage.getItem('babyInfo'));
  // $.ajax({
  //   url: 'XX',
  //   type: 'POST',
  //   data: {
  //     id: pageId
  //   },
  //   success: function(data) {
  //     if (data) {
  //       // 读取宝宝信息
  //     	if (localStorage.babyInfo) {
  //     		$('.tip').first().css({
  //     			'font-size': '0'
  //     		});
  //     		// 宝宝姓名
  //     		$('.babyName').html(babyInfo.name);
  //     		// 宝宝性别
  //     		$('.babySex').html(babyInfo.sex);
  //     		// 宝宝生日
  //     		var birthArr = babyInfo.birth.split(',');
  //     		var birthday = birthArr[0] + '年' + birthArr[1] + '月' + birthArr[2] + '日';
  //     		$('.babyBirth').html(birthday);

  //       	// 进入页面时从本地存储中读取地址信息
  //       	// 读取是否有默认或编辑两种类型中的一个
  //     		$('.tip').last().css({
  //     			'font-size': '0'
  //     		});

  //     		// 获取电话并添加至dom元素中
  //     		$('.tel').html(parentInfo.phone);
  //     		// 获取地址并添加至dom元素中
  //     		$('.address').html((parentInfo.address1 + parentInfo.address2).replace(/\s+/g, ""));
  //         // 上门时间
  //         var currentArr = [];
  //         insertTime(currentArr);
  //       }

  //     }
  //   },
  //   error: function() {
  //     alert('啊哦，网络开小差了');
  //   }
  // });
});

// 传入时间数组，根据数据将页面中的上门时间内容进行调整
function insertTime(arrry) {
  var arr = [];
  // 遍历数组数据，将小于10的数字前面加'0'，并改变dom元素
  arrry.forEach(function(item) {
    if (item < 10) {
      item = '0' + item;
      parseInt(item);
    }
    arr.push(item);
  });
  $('.timeContainer .time').first().html(arr[0] + '-' + arr[1] + '-' + arr[2]);
  $('.timeContainer .time').last().html(arr[3] + ':' + arr[4]);
}