$(document).ready(function() {
	// 读取订单号id
	var pageId = sessionStorage.orderid;
	console.log(pageId);
  // 读取本地存储，如果有数据则调取数据先进行显示
  var babyInfo = JSON.parse(localStorage.getItem('babyInfo'));
     $.ajax({
       url: 'http://' + ip + '/tuina/api.php?s=/order/weichart/getOrderInfo',
       type: 'POST',
       data: {
         id: pageId
       },
       success: function(data) {
       	console.log(data);
         if (data) {
           // 读取宝宝信息
         	if (localStorage.babyInfo) {
         		$('.tip').first().css({
         			'font-size': '0'
         		});
         		// 宝宝姓名
         		$('.babyName').html(babyInfo.name);
         		// 宝宝性别
         		$('.babySex').html(babyInfo.sex);
         		// 宝宝生日
         		var birthArr = babyInfo.birth.split(',');
         		var birthday = birthArr[0] + '年' + birthArr[1] + '月' + birthArr[2] + '日';
         		$('.babyBirth').html(birthday);
           }

	       	// 进入页面时从本地存储中读取地址信息
	       	// 读取是否有默认或编辑两种类型中的一个
	     		$('.tip').last().css({
	     			'font-size': '0'
	     		});
	
	     		// 获取电话并添加至dom元素中
	     		$('.tel').html(data.mobile);
	     		// 获取地址并添加至dom元素中
	     		$('.address').html((data.address1 + data.address2).replace(/\s+/g, ""));
	         // 上门时间
	         var currentArr = ["2017","3","2","15","43"];
	         var arr1 = data.start_time.split(/\s/)[0].split('-');
	         var arr2 = data.start_time.split(/\s/)[1].split(":");
	         arr1.push.apply(arr1, arr2);
	         insertTime(arr1);
	         
					// 症状信息
					$('.info').html(data.service_id.replace(',', '、'));
					
					// 按摩价格
					$('.price').html('￥' + data.order_money + '元');
					
					// 按摩项目
					$('.itemWrapper:last-child .title').html(data.package_name);
         }
       },
       error: function() {
         alert('啊哦，网络开小差了');
       }
     });
});

// 传入时间数组，根据数据将页面中的上门时间内容进行调整
function insertTime(arrry) {
  var arr = [];
  // 遍历数组数据，将小于10的数字前面加'0'，并改变dom元素
//arrry.forEach(function(item) {
//  if (item < 10) {
//    item = '0' + item;
//    parseInt(item);
//  }
//  arr.push(item);
//});
  $('.timeContainer .time').first().html(arrry[0] + '-' + arrry[1] + '-' + arrry[2]);
  $('.timeContainer .time').last().html(arrry[3] + ':' + arrry[4]);
}