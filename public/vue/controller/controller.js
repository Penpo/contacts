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
			var self = this;
			$.post('/contactlist', {name: this.newContact.name, email: this.newContact.email, number: this.newContact.number}, function(data, textStatus, xhr) {
				if(data.status === 'success'){
					myApp.contactlist.push({name: self.newContact.name, email: self.newContact.email, number: self.newContact.number});
					myApp.deselect();
				}
			});
		},
		deselect: function(event){
			event ? event.preventDefault() : true;
			this.newContact = {};
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
		editContact: function($index){
			event.preventDefault();
			this.newContact = this.contactlist[$index];
		},
		update: function(){
			event.preventDefault();
			var self = this;
			$.ajax({
				url: '/contactlist/' + this.newContact._id,
				type: 'put',
				dataType: 'json',
				data: {name: this.newContact.name, email: this.newContact.email, number: this.newContact.number},
				success: function(data) {
					if(data.result){
						this.newContact = {};
					} else {
						alert('网络错误！');
					}
				},
				error: function() {
					alert('网络错误！');
				}
			});
		},
	}
})

$.get('/contactlist', function(data) {
	myApp.contactlist = myApp.contactlist.concat(data);
});
