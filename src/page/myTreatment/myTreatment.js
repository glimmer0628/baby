$(document).ready(function() {
  $.ajax({
    url: 'myTreatment.json',
    type: 'GET',
    success: function(data) {
      $('.count').html(data.count);
    },
    error: function() {
      alert('啊哦，网络开小差了');
    }
  });
});