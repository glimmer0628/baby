$("").ready(function() {
	
	$.ajax({
                url:"comment.json",
                type:"get",
                dataType:"json",
                success: function(data) {
                	console.log(data);
                	
                		$(".comment_top").append("<img src='"+data.url+"' /><div><span>"+data.name+"</span><span>"+data.time+"</span></div>");
                	
                }
            
           });
	
	var cObj = {};//存放星星数量的
	$("#result").hide();//将保存结果的DIV隐藏
	     
		$('#star').raty({
			
			hints: ['1', '2', '3', '4', '5'],//指针放到星星上默认显示‘bad’‘poor’‘reuglar’…可以自定义要显示的文本，通过hint属性。现在换成1，2，3…
			path:"../../assets",  //图标的路径
			starOff: 'star2.png',//更换图标
            starOn: 'star3.png',
            size:24, //图标的宽度
            
            //获取用户选择的值：第一种：　通过click事件来获取
            click: function(score, evt) {
            	console.log(score);
            	evt.stopPropagation();    //  阻止事件冒泡
            	  evt.preventDefault();  //阻止默认行为 ( 表单提交 )
// 				cObj = {
//                          starnum:score
//                        };
                
   
            },
            //第二种：　设置一个隐蔽的HTML元素来保存用户的选择值
            target: '#result',
 
            targetKeep : true
		});
		$(".commentbt").click(function(e) {
			//存放评价的json
			cObj={
				starnum:$("#result").html(),
				contant:$(".pingLun").val()
			};
			
			 if($("#result").html().length==0){
			 	alert('请打分');
			 } else {
			 	
				cAjax(cObj); 
				window.location.href="../orderpage/order.html";
			 }
			
		});
		
		function cAjax(obj) {
            $.ajax({
                url:'',
                type:'get',
                data:obj,
                success:function(data){
					
                }
            });
            
          }

});
