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
		removeContact: function($index){
			event.preventDefault();
			var self = this;
			$.ajax({
				url: '/contactlist/' + this.contactlist[$index]._id,
				type: 'DELETE',
				dataType: 'json',
				data: this.contactlist[$index],
				success: function(data){
					if(data.status === 'success'){
						self.contactlist.splice([$index], 1);
					}
				}
			});
		},
	}
})

$.get('/contactlist', function(data) {
	myApp.contactlist = myApp.contactlist.concat(data);
});
