var myApp = new Vue({
	el: '#contactform',
	data: {
		contactlist: []
	}
})

$.get('/contactlist', function(data) {
	// 似乎 Vue 没有监听 data 数组的concat事件，所以只能用 ES 6 的方法
	myApp.contactlist.push(...data);
});
