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
console.time('add contacts');
function addContacts(num){
	if(num <= 0){
		console.log('manipulate finished');
		process.exit();
	}
	let firstName = (Math.random() * 1e16).toString(36).replace(/\d/g, '');
	let lastName = (Math.random() * 1e16).toString(36).replace(/\d/g, '');

	let newcontact = new Contact({
		name: `${firstName[0].toUpperCase() + firstName.substr(1)} ${lastName[0].toUpperCase() + lastName.substr(1)}`,
		email: `${firstName}.${lastName}@gmail.com`,
		number: Math.random() * 1e16
	});
	newcontact.save(function(err, contact) {
		if (err) {
			return console.log(err)
		};
		// console.log(contact);
		addContacts(num - 1);
	});
}
addContacts(5000);
console.timeEnd('add contacts');
