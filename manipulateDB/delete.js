'use strict';
const express = require('express');
const http = require('http');
const app = express();
const querystring = require('querystring');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactlist');

const db = mongoose.connection;
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
console.time('delete contacts');
Contact.find(function(err, contacts) {
	if (err) {
		return console.error(err);
	};
	deleteContacts(contacts.splice(10));
});
function deleteContacts(contacts){
	if(contacts.length <= 0){
		console.timeEnd('delete contacts');
		console.log('manually delete data finished');
		process.exit();
	}
	Contact.findByIdAndRemove(contacts[0].id, function(err, contact){
		if (err) {
			return console.log(err);
		};
		contacts.shift();
		deleteContacts(contacts);
	});

}
