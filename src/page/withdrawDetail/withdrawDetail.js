$(document).ready(function() {
  var myScroll = new IScroll('.scrollerWrapper');

  // 刚进入页面时，读取本地存储数据，后进行请求初始化单号
  getLocalStorage('all');
  getAjaxInsert('all.json', 'all', myScroll);

  // 点击标题时触发的事件
  $('.titleWrapper .title').click(function(e) {
    // 先移除样式类，再向点击的元素添加样式类
    $('.titleWrapper .title').removeClass('active');
    $(e.target).addClass('active');
  });

  // 点击"所有"按钮
  $($('.titleWrapper .title').get(0)).click(function() {
    getLocalStorage('all');
    getAjaxInsert('all.json', 'all', myScroll);
  });

  // 点击"待审核"按钮
  $($('.titleWrapper .title').get(1)).click(function() {
    getLocalStorage('pending');
    getAjaxInsert('pending.json', 'pending', myScroll);
  });

  // 点击"待打款"按钮
  $($('.titleWrapper .title').get(2)).click(function() {
    getLocalStorage('toBePaied');
    getAjaxInsert('toBePaied.json', 'toBePaied', myScroll);
  });

  // 点击"已打款"按钮
  $($('.titleWrapper .title').get(3)).click(function() {
    getLocalStorage('paied');
    getAjaxInsert('paied.json', 'paied', myScroll);
  });

  // 点击"无效"按钮
  $($('.titleWrapper .title').get(4)).click(function() {
    getLocalStorage('invalid');
    getAjaxInsert('invalid.json', 'invalid', myScroll);
  });
});


// 判断本地存储是否有这个键名，如果有，则添加dom元素
function getLocalStorage(localKey) {
  if (localStorage.getItem(localKey)) {
    var data = JSON.parse(localStorage.getItem(localKey));
    appendList(data);
  }
}

// 传入请求地址,localStorage的key及iscroll（为了刷新dom树），将请求到的数据添加到dom树中
function getAjaxInsert(url, localKey, myScroll) {
  $.ajax({
    url: url,
    type: 'GET',
    success: function(data) {
      // 现将请求到的数据添加到localStorage中
      localStorage.setItem(localKey, JSON.stringify(data));

      // 添加dom元素之前先判断，如果之前添加了就把之前的删除掉
      if($('.list').length) {
        $('.list').remove();
      }
      
      // 添加dom元素
      appendList(data, myScroll);
    },
    error: function() {
      alert('啊哦，网络开小差了，未更新数据');
    }
  });
}

// 传入数据，添加dom元素，初始化scroll树
function appendList(data, myScroll) {
  // 遍历数据，将dom元素添加至相应容器中
  data.forEach(function(item) {
    var tpl = '<li class="border-1px list">' +
                '<div class="numContain">' +
                  '单号:' +
                  '<span class="num">' + item.num + '</span>' +
                '</div>' +
                '<span class="count">' + item.count + '元</span>' +
              '</li>';
    $(tpl).appendTo($('.listWrapper'));

    // 添加完成后刷新iscroll，使得其dom树跟随变化
    if (myScroll) {
      myScroll.refresh();
    }
  });
}