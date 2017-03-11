$(document).ready(function() {
  $.ajax({
    url: 'http://' + ip + '/tuina/api.php?s=/user/weichart/getUserCourse',
    type: 'POST',
    data: {
    	id: JSON.parse(sessionStorage.userInfo).openid
    },
    success: function(data) {
      $('.count').html(data.lost_counts);
    },
    error: function() {
      alert('啊哦，网络开小差了');
    }
  });
});