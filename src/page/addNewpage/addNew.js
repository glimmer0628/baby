$("").ready(function() {
	var str;//存放localStorage的
	var obj;
	
	//读取地址栏参数，判断是从地址管理进入的还是从订单页进入
	if (GetQueryString('default') == 'true') {
		//从订单页进入，订单页显示的是默认地址，读取 默认地址
		str = localStorage.parentInfo; 
	} else {
		//从地址管理进入，读取 编辑地址
		str = localStorage.editAdd; 
	}
	 
	if(str){
		//重新转换为对象 
	obj = JSON.parse(str);
	console.log(obj);
	$(".newname").val(obj.name);
	$(".newphone").val(obj.phone);
	$(".diqu").html(obj.address1);
	$(".dizhi").val(obj.address2);

	}
	//保存地址
	$(".saveDizhi").click(function() {
		//判断是否输入信息
		if($(".newname").val().length==0){
			alert('请输入姓名');
		}
		else if($(".newphone").val().length==0){
			alert('请输入手机号');
		}
		else if($(".diqu").html().length==0){
			alert('请选择地区');
		}
		else if($(".dizhi").val().length==0){
			alert('请输入详细地址');
		}else{
			//把姓名，手机号，地区，详细地址存入本地
			var parentInfo={
				name:$(".newname").val(),
				address1:$(".diqu").html(),
				address2:$(".dizhi").val(),
				phone:$(".newphone").val()
			};
			//如果是新增地址，从地址栏获取id,放进parentInfo里
			if (GetQueryString('new') == 'true') {
				parentInfo.addressid = GetQueryString('addLen');
			}
			//存入到本地存储编辑的地址（editAdd）
			localStorage.editAdd = JSON.stringify(parentInfo);
			// 如果localStorage里有地址，并且编辑的地址id跟默认的地址id相同，保存到默认地址
			if (str) {
				if (JSON.parse(str).addressid == JSON.parse(localStorage.parentInfo).addressid) {
					localStorage.parentInfo = JSON.stringify(parentInfo);
				}else{
					
				}
			}
			window.history.back();
		}
//		-----------------------------------> post请求向数据库提交
	});
	
	
	//地区插件
	//---------------------函数调用开始---------------------
    var diqu='';
    new MultiPicker({
        input: 'multiPickerInput',//点击触发插件的input框的id
        container: 'targetContainer',//插件插入的容器id
        jsonData: $city,
        success: function(arr) {
            console.log(JSON.stringify(arr));
            if(diqu!=''){
            	diqu='';
            }	 
            $(arr).each(function(i) {
            		
            			diqu+=arr[i].value+' ';
            		 
            });
           
            	 $(".diqu").html(diqu);
          
        }//回调
    });
    //---------------------函数调用结束---------------------

});

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}