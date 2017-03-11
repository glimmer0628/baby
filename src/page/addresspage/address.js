$("").ready(function() {
	 var cObj = {};//更新地址的
	var num;//存放默认地址的id
//	地址管理
	// openid
	var openid = JSON.parse(sessionStorage.userInfo).openid;
	$.ajax({
            url:"http://" + ip + "/tuina/api.php?s=/user/Weichart/getUserAddress",
            type:"post",
            dataType:"json",
            data:{id:openid},
            success: function(data) {
                console.log(data);
           		$(data).each(function(i) {
           			//如果is_default=1，是默认地址，图标样式变
           			if (data[i].is_default == '1') {
           				var address_top="<span class='address_name'>"+data[i].user_name+"</span><span class='address_phone'>"+data[i].mobile+"</span><br/><span class='address_address1'>"+data[i].address+"</span>&nbsp;<span class='address_address2'> "+data[i].address_info+"</span>";
               			var address_bottom="<div class='moren'><span class='moren-icon moren-icon1'></span><span>默认地址</span></div><div class='del'><span></span><span>删除</span></div><div class='bianji'><span></span><span>编辑</span></div>";
               			$(".container").append("<div class='address' add-id="+data[i].id+"><div class='address_top'>"+address_top+"</div><div class='address_bottom'>"+address_bottom+"</div></div>");
           				//把默认地址存储
           				var parentInfo={
           					id:data[i].id,
           					name:data[i].user_name,
           					phone:data[i].mobile,
           					address1:data[i].address,
           					address2:data[i].address_info
           				};
           				console.log(parentInfo);
           				localStorage.parentInfo = JSON.stringify(parentInfo);
           			} else {
               			var address_top="<span class='address_name'>"+data[i].user_name+"</span><span class='address_phone'>"+data[i].mobile+"</span><br/><span class='address_address1'>"+data[i].address+"</span>&nbsp;<span class='address_address2'> "+data[i].address_info+"</span>";
               			var address_bottom="<div class='moren'><span class='moren-icon'></span><span>默认地址</span></div><div class='del'><span></span><span>删除</span></div><div class='bianji'><span></span><span>编辑</span></div>";
               			$(".container").append("<div class='address' add-id="+data[i].id+"><div class='address_top'>"+address_top+"</div><div class='address_bottom'>"+address_bottom+"</div></div>");
           			}
           			
           		});

				//	默认地址
           		$(".moren").click(function(e) {
           			e.stopPropagation();
  					//样式的改变
  					$('.address').find('.moren-icon').removeClass('moren-icon1');
           			$(this).children('.moren-icon').addClass('moren-icon1');
           			//更改存放默认地址的localStorage
           			
           			localStorage.parentInfo = JSON.stringify(getAddInfo(this));
           			//发送给后台默认地址的id
           			cObj = {
                     id:$(this).parents('.address').attr('add-id')
                  	};
                    cAjax("addressDefault",cObj);  
           		});

                //    编辑按钮
                $(".bianji").click(function(e) {
                	e.stopPropagation();
                    //存入localStorage
                   
                    localStorage.editAdd = JSON.stringify(getAddInfo(this));
                    var addID=$(this).parents('.address').attr('add-id');
                    window.location.href="../addNewpage/addNew.html?addressid="+addID;
                });
           		//		删除按钮
           		$(".del").click(function(e) {
					e.stopPropagation();
					cObj = {
                     id:$(this).parents('.address').attr('add-id')
                  	};
                    cAjax('delAddress',cObj);  
                    //$(this).parents('.address').css('display','none');
                    
  				});
  				
  				//地址的点击事件
  				$(".address").click(function() {
  					// 姓名
  					var name = $(this).find('.address_name').text();
  					// 电话
  					var phone = $(this).find('.address_phone').text();
  					// 地址
  					var address1 = $(this).find('.address_address1').text();
  					var address2 = $(this).find('.address_address2').text();
  					
  					// 保存本地存储
					var checkedInfo = {
						id: $(this).attr('add-id'),
						name: name,
						phone: phone,
						address1: address1,
						address2: address2
					};
					localStorage.checkedInfo = JSON.stringify(checkedInfo);
					setTimeout(function() {
						if (GetQueryString('order') == 'true') {
							window.location.href="../account/account.html";
						}
					}, 300);
  				});
            },
            error: function() {
     		       alert('失败');
   			}
    });
		// 更新地址的ajax
        function cAjax(str,obj) {
        $.ajax({
            url:"http://" + ip + "/tuina/api.php?s=/user/Weichart/"+str,
            type:'post',
            data:obj,
            success:function(data){
				 window.location.reload();
            }
        });
        
        }
            
		//	添加新地址按钮
		$(".add_new").click(function() {
      		localStorage.removeItem("editAdd");
			window.location.href="../addNewpage/addNew.html?new=true";
		});
		
});

// 获取地址栏参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
//获取存入本地的地址信息
function getAddInfo(vm){
	var parentEle = $(vm).parents('.address');
    var editAdd={
			id:parentEle.attr('add-id'),
			name:parentEle.find('.address_name').text(),
			phone:parentEle.find('.address_phone').text(),
			address1:parentEle.find('.address_address1').text(),
			address2:parentEle.find('.address_address2').text()
		};
    return editAdd;
}
