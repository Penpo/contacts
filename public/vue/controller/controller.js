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
		},
		removeContact: function(dom){
			event.preventDefault();
			console.log(this.contactlist[dom.$index]._id);
			console.log(this.contactlist[dom.$index])
			$.ajax({
				url: '/contactlist/' + this.contactlist[dom.$index]._id,
				type: 'DELETE',
				dataType: 'json',
				data: this.contactlist[dom.$index],
				success: function(data){
					console.log(data);
				}
			});
		},
	}
})

$.get('/contactlist', function(data) {
	myApp.contactlist = myApp.contactlist.concat(data);
});
