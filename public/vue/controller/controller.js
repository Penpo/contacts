var myApp = new Vue({
	el: '#contactform',
	data: {
		newContact: {
			name: '',
			email: '',
			number: ''
		},
		contactlist: []
	},
	methods: {
		addContact: function(event){
			event.preventDefault();
			$.post('/contactlist', {name: this.newContact.name, email: this.newContact.email, number: this.newContact.number}, function(data, textStatus, xhr) {
				myApp.contactlist = data;
			});
			// $.ajax({
			// 	url: '/contactlist',
			// 	type: 'POST',
			// 	dataType: 'json',
			// 	data: {name: this.newContact.name, email: this.newContact.email, number: this.newContact.number},
			// 	contentType: "application/json"
			// })
			// .done(function(data) {
			// 	myApp.contactlist = data;
			// });

		}
	}
})

$.get('/contactlist', function(data) {
	myApp.contactlist = myApp.contactlist.concat(data);
});
