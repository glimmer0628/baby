/**
  js文件生效时先请求后台数据，将后台数据导入页面中生成数据
**/

// 根据传入的参数不同，生成的html模版内容不同
function getTpl(item, idx, status) {
	// 如果状态为显示， 则返回模板数据，否则走下一个流程
	if (status == '1') {
	  var tpl = '<div class="sumContainer" data-id="' + idx + '">' +
	              '<span class="sum">' + item + '</span>' +
	            '</div>';
	  return tpl;
	}
	return;
}

$(document).ready(function() {
	// 获取本地会话的diseaseID并且向后台发起请求
	var diseaseID = sessionStorage.diseaseID.split(',').toString();
	
  var myScroll;
	// 请求后台数据
	$.ajax({
		url: "http://"+ip+"/tuina/api.php?s=/system/Weichart/getOrderInfo",
		type: 'POST',
		data: {
			ids: diseaseID
		},
		success: function(data) {
			// 获取默认价格
			$('.price').html('￥' + data.serviceInfo.normal[0].money);
      // 项目、疾病信息
      $('.headerDetail .project').html('小儿推拿&nbsp;&nbsp;' + data.name.join('+'));
      // 生成选择技师的html模版
      if(data.username) {
        data.username.forEach(function(item) {
          $(getTpl(item.name, item.id, item.status)).appendTo($('.chooseContent').first());
        });
      } else {
        $('.infoWrapper').first().remove();
      }
      
      // 生成疗程选择的模版
      data.servicename.forEach(function(item) {
        $(getTpl(item.name, item.id, item.status)).appendTo($('.chooseContent').last());
      });
      
      // 将每个选项组中的第一个默认调整为选中状态
      $('.chooseContent').first().find('.sumContainer').first().addClass('active');
      $('.chooseContent').last().find('.sumContainer').first().addClass('active');
		  // 点击后，先移除当前所有子元素的样式类，后向点击的对象添加样式类
		  $('.sumContainer').click(function(e) {
		  	$($(this).parent().get(0)).find('.sumContainer').removeClass('active');
		    $(e.currentTarget).addClass('active');
		  });
      
      // 点击疗程选择时拿到元素上的data-id属性，更改价格内容
	    $('.chooseContent').last().find('.sumContainer').click(function(e) {
	    	var checkedId = parseInt($(this).attr('data-id'));
	    	
	    	// 判断是否选择了普通技师
	    	if($('.chooseContent').first().find('.sumContainer').first().hasClass('active')) {
	    		data.serviceInfo.normal.forEach(function(item) {
	    			if (item.package_id == checkedId) {
	    				$('.price').html('￥' + item.money);
	    			}
	    		});
	    	}
	    });
      // 添加介绍信息
      $('.infoWrapper .introduce').html(data.describe);
		},
		error: function() {
      alert('网络开小差了..');
		}
	});

  // 点击确认预约按钮
	$('.confirmBtn').click(function() {
		localStorage.price = $('.price').html().replace('￥', "");
    // 判断"单次服务"按钮是否被点击，如果被点击，则向回话存储中存值，以确保支付页面没有余额支付
    if($('.chooseContent').last().find('.sumContainer').first().hasClass('active')) {
      sessionStorage.setItem('single', 'true');
    } else {
    	sessionStorage.setItem('single', 'false');
    }
    // 取到diseaseID和选择的id,并存到sessionStorage中
    var chosenId = [];
    $('.active').forEach(function(item) {
    	chosenId.push($(item).attr('data-id'));
    });
    sessionStorage.chosenId = chosenId;
		window.location.href = '../account/account.html';
	});
});