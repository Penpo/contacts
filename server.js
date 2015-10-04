var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactlist');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("Database is connected!");
});
var contactSchema = new mongoose.Schema({
    name: {type: String},
    email: String,
    number: String
});
var Contact = mongoose.model('Contact', contactSchema);
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());

app.get('/contactlist', function(req, res){
	Contact.find(function(err, contacts) {
		if (err) {
			return console.err(err);
		};
		res.json(contacts);
	});
})
// 接收POST请求
app.post('/contactlist', function(req, res){
	console.log(req.body);
	// db.contactlist.insert(req.body, function(err, docs){
	// 	res.json(docs);
	// });
	var newcontact = new Contact(req.body);
	newcontact.save(function(err, contact) {
		if (err) {
			return console.log(err)
		};
		console.log(contact);
	});
	Contact.find(function(err, contacts) {
		if (err) {
			return console.err(err);
		};
		res.json(contacts);
	});
});

// 删除数据
app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	Contact.findByIdAndRemove(id,function(err, contact){
		if (err) {
			return console.log(err);
		};
		console.log(contact);
		res.json(contact);
	})
})

// 获取单个数据
app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	Contact.findById(id,function(err, contact){
		if (err) {
			return console.log(err);
		};
		console.log(contact);
		res.json(contact);
	})
})
// 更改数据
app.put('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	Contact.findByIdAndUpdate(id, {
		$set: {
			name: req.body.name,
			email: req.body.email,
			number: req.body.number
		}
		}, function(err, contact){
			if (err) {
				return console.log(err);
			};
			console.log(contact);
			res.json(contact);
	})
})

app.listen(2333);
console.log('Server on port 3000');
