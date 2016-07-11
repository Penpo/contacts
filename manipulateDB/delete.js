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
	removeContacts(contacts);
});
function deleteContacts(contacts){
	if(num <= 0){
		process.exit();
	}
	Contact.findByIdAndRemove(contacts.id, function(err, contact){
		if (err) {
			return console.log(err);
		};
	});
}
console.timeEnd('delete contacts');
