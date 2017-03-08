$("").ready(function() {
	
	$.ajax({
                url:"myteam.json",
                type:"get",
                dataType:"json",
                success: function(data) {
                	console.log(data);
                	$(data).each(function(i) {
                		$(".container").append("<div class='myTeam'><img src='"+data[i].url+"' /><span class='name'>"+data[i].name+"</span><span class='xiaxian'>"+data[i].xiaXian+"</span></div>");
                	});
                }
            
           });
});
