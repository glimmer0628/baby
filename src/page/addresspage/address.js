$("").ready(function() {
	 var cObj = {};//更新地址的
	var num;//存放默认地址的id
	var addLen=0;//地址数组的长度
//	地址管理
	$.ajax({
                url:"address.json",
                type:"get",
                dataType:"json",
                success: function(data) {
                    console.log(data);
                    addLen=data.length;
               		$(data).each(function(i) {
               			var address_top="<span class='address_name'>"+data[i].name+"</span><span class='address_phone'>"+data[i].phone+"</span><br/><span class='address_address1'>"+data[i].address1+"</span>&nbsp;<span class='address_address2'> "+data[i].address2+"</span>";
               			var address_bottom="<div class='moren'><span class='moren-icon'></span><span>默认地址</span></div><div class='del'><span></span><span>删除</span></div><div class='bianji'><span></span><span>编辑</span></div>";
               			$(".container").append("<div class='address' add-id="+data[i].addressid+"><div class='address_top'>"+address_top+"</div><div class='address_bottom'>"+address_bottom+"</div></div>");
               			
               		});
               		//第一个默认图标的样式
               		$('.address').eq(0).find('.moren-icon').css('background','url(../../assets/21.png)').css('background-size','100% 100%');
					//	默认地址
					//把第一条存入本地存储
					num=$('.address').eq(0).attr('add-id');
					str = JSON.stringify(data[num]); 
               		localStorage.parentInfo = str;
               		$(".moren").click(function() {
      					//样式的改变
      					$('.address').find('.moren-icon').css('background','url(../../assets/box5.png)').css('background-size','100% 100%');
               			$(this).children('.moren-icon').css('background','url(../../assets/21.png)').css('background-size','100% 100%');
               			//更改存放默认地址的localStorage
               			num=$(this).parents('.address').attr('add-id');
               			str = JSON.stringify(data[num]); 
               			localStorage.parentInfo = str;
               		});

	                //    编辑按钮
	                $(".bianji").click(function() {
	                    //存入localStorage
	                    var str = JSON.stringify(data[$(this).parents('.address').attr('add-id')]); 
	                    localStorage.editAdd = str; 
	                    window.location.href="../addNewpage/addNew.html";
	                });
               		//		删除按钮
               		$(".del").click(function() {
						
  						cObj = {
                         addressID:$(this).parents('.address').attr('add-id')
                      	};
                        cAjax(cObj);  
                        $(this).parents('.address').css('display','none');
      				});
                },
                error: function() {
         		       alert('失败');
       			}
    });
		// 更新地址的ajax
        function cAjax(obj) {
        $.ajax({
            url:'',
            type:'get',
            data:obj,
            success:function(data){
				 $(this).parents('.address').css('display','none');
            }
        });
        
        }
            
		//		删除按钮
//		$.ajax({
//		    type:"POST",
//		    data:$.param({id:v}),
//		    url:"/action/post/dele", //后台提供的删除接口
//		    dataType:'json',
//		    success:function(data){
//		        var html = '';
//		        if(data.status == 1){
//		            alert('删除成功');
//		            window.location.reload();
//		        } else {
//		            alert('删除失败，请稍后重试'); return false;
//		        }
//		    }
//		});
		//	添加新地址按钮
		$(".add_new").click(function() {
      		localStorage.removeItem("editAdd");
			window.location.href="../addNewpage/addNew.html?new=true&addLen=" + addLen;
		});
		
});
