$(document).ready(function() {
	// 调取本地存储的数据，如果有数据，则向html标签中添加内容
	if (localStorage.babyInfo) {
		var babyInfo = JSON.parse(localStorage.babyInfo);
		// 宝宝姓名
		$('.inputName').val(babyInfo.name);
		// 宝宝性别
		$('.sex').html(babyInfo.sex);
		// 宝宝出生年月
		insertTime(babyInfo.birth.split(','));
	}
	
  // 选择性别时点击则换性别
  $('.itemContent>li:nth-child(2)').click(function(e) {
    var sexText = $(e.target).find('.sex');
    sexText.html() == '男' ? sexText.html('女') : sexText.html('男');
  });


  // 选取时间插件的设置
  new DateSelector({
    input : 'timePicker',//点击触发插件的input框的id
    container : 'selectDate',//插件插入的容器id
    type : 0,
    //0：不需要tab切换，自定义滑动内容，建议小于三个；
    //1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
    param : [1,1,1,0,0],
    //设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
    beginTime : [1995, 3, 2],//如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
    endTime : [2060, 12, 31],//如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
    recentTime : [],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
    success : function(data){
      // 取到数组数据
      insertTime(data);
    }//回调
  });

  // 匹配日期的正则表达式
  $('.submitBtn').click(function(e) {
  	e.preventDefault();
    var date = $('.time').get(0).innerHTML;
    //将日期字符串格式化为日期数组
    var canISave = true;
    // 点击保存按钮进行验证
    var babyName = $('.inputName').val();
    if (!babyName) {
    	alert('宝宝姓名不能为空');
    	canISave = false;
    }
    var babySex = $('.sex').html();
    if (!$('.time').html().length) {
    	alert('宝宝出生年月不能为空');
    	canISave = false;
    }
    
    var babyBirth = dateStrToArr(date).toString();
    
    if (canISave) {
	    babyInfo = {
	    	name: babyName,
	    	sex: babySex,
	    	birth: babyBirth
	    };
	    localStorage.babyInfo = JSON.stringify(babyInfo);
//  	window.location.href = '../account/account.html';

		window.history.back();
    }
    
  });
  
//$.ajax({
//	type:"post",
//	url:"/babyInfo",
//	data: {
//		babyInfo: babyInfo
//	},
//	success: function(res) {
//		
//	}
//});
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
  
  $('.timeContainer .time').html(arr[0] + '-' + arr[1] + '-' + arr[2]);
}

// 传入YYYY-MM-DD MM:SS格式的字符串，返回一个[YYYY, MM, DD, MM, SS]格式的数组
function dateStrToArr(dateStr) {
  var dateReg = /^(\d{4})(\-|\/|\.)(\d{1,2})\2(\d{1,2})$/;
  var strArr = dateStr.replace(dateReg, '$1,$3,$4');
  var newArr = [];
  strArr.split(',').forEach(function(item) {
    newArr.push(parseInt(item));
  });
  return newArr;
}