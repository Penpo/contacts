var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());

app.get('/contactlist', function(req, res){
	console.log('I received a GET request!');
	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
})
// 接收POST请求
app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, docs){
		res.json(docs);
	});
});

// 删除数据
app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.send(docs);
	})
})

// 获取单个数据
app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.send(docs);
	})
})
// 更改数据
app.put('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
			query: {
				_id: mongojs.ObjectId(id)
			},
			update: {
				$set: {
					name: req.body.name,
					email: req.body.email,
					number: req.body.number
				}
			},
			new: true
		},
		function(err, docs) {
			res.json(docs);
		})
})

app.listen(3000);
console.log('Server on port 3000');
