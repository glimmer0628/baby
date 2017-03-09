$(document).ready(function() {
  // 读取本地存储，如果有数据则调取数据先进行显示
  var babyInfo = JSON.parse(localStorage.getItem('babyInfo'));

	// 根据上个页面传来的数据显示总金额
	if (localStorage.price) {
		$('.count').html('￥' + localStorage.price);
	} else {
		$('.count').html('￥0');
	}
	
	// 进入页面时从本地存储中读取宝宝信息
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
//	alert(localStorage.checkedInfo);
	if (localStorage.parentInfo || localStorage.checkedInfo) {
		$('.tip').last().css({
			'font-size': '0'
		});
		// 若有默认地址，则将变量赋值为默认地址，
		// 若无默认地址，则用户第一次进入程序，变量赋值
		// 为编辑地址
		if (localStorage.checkedInfo) {
			var parentInfo = JSON.parse(localStorage.checkedInfo);
		} else if (localStorage.parentInfo) {
			var parentInfo = JSON.parse(localStorage.parentInfo);
		}
		// 从本地存储中获取电话并添加至dom元素中
		$('.tel').html(parentInfo.phone);
		// 从本地存储中获取地址并添加至dom元素中
		$('.address').html((parentInfo.address1 + parentInfo.address2).replace(/\s+/g, ""));
		// 将id存到dom元素上
		$('.posWrapper').attr('add-id', parentInfo.id);
	}

  // 把当前时间插入“上门时间中”
  var date = new Date();
  var currentArr = [];
  currentArr.push(date.getFullYear());
  currentArr.push(date.getMonth() + 1);
  currentArr.push(date.getDate());
  currentArr.push(date.getHours());
  currentArr.push(date.getMinutes());
  insertTime(currentArr);

  // 选取时间插件的设置
  new DateSelector({
    input : 'timePicker',//点击触发插件的input框的id
    container : 'selectDate',//插件插入的容器id
    type : 1,
    //0：不需要tab切换，自定义滑动内容，建议小于三个；
    //1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
    param : [1,1,1,0,0],
    //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
    beginTime : [2017, 3, 2, 00, 00],//如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
    endTime : [2060, 12, 31, 00, 00],//如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
    recentTime : [],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
    success : function(data){
      // 取到数组数据
      insertTime(data);
    }//回调
  });
  
	//			跳转页面
	$(".itemWrapper:nth-of-type(1)").click(function() {
		window.location.href="../babyInfo/babyInfo.html";
	});
	$(".itemWrapper:nth-of-type(2)").click(function() {
		window.location.href="../addresspage/address.html?order=true";
	});
	$('.right').click(function(e) {
		e.preventDefault();
		if ($('.tip').css('font-size') == '12px') {
			alert('请填写完整信息');
		} else {
			// 向后台提交订单信息
			var openid = JSON.parse(sessionStorage.userInfo).openid;
			// 选择项目的id
			var service_id = sessionStorage.diseaseID;
			// 选择套餐的id
			var service_type = sessionStorage.chosenId.split(',')[1];
			// 选择技师类型id
			var user_type = sessionStorage.chosenId.split(',')[0];
			// 选择上门时间
			var start_time = $('.time').first().text().replace(/-/g, '') + $('.time').last().text().replace(/:/g, '');
			// 选择地址id
			var address_id = $('.posWrapper').attr('add-id');
			// 获取订单金额
			var money = localStorage.price;
			// 获取宝宝出生日期
			var birth_date = [];
			babyInfo.birth.split(',').forEach(function(item) {
				if (item <= 10) {
					item = '0' + item;
				}
				birth_date.push(item);
			});
			// 向后台发送订单数据
			$.ajax({
				type:"post",
				url:"http://" + ip + "/tuina/api.php?s=/order/Weichart/setOrder",
				async:true,
				data: {
					id: openid,
					service_id: service_id,
					service_type: service_type,
					user_type: user_type,
					start_time: start_time,
					address_id: address_id,
					money: money,
					name: babyInfo.name,
					sex: babyInfo.sex == '男' ? 0 : 1,
					birth_date: birth_date.join(',').replace(/,/g, '')
				},
				success: function(data) {
					if (data === 'Success') {
						window.location.href = '../pay/pay.html';
					};
				}
			});
		}
	});
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