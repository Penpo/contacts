'use strict';
var http = require('http');
var querystring = require('querystring');
console.time('Add data');
for (var i = 1; i < 500; i++) {
	var firstName = (Math.random() * 1e16).toString(36).replace(/\d/g, '');
	var lastName = (Math.random() * 1e16).toString(36).replace(/\d/g, '');

	var postData = querystring.stringify({
		name: `${firstName[0].toUpperCase() + firstName.substr(1)} ${lastName[0].toUpperCase() + lastName.substr(1)}`,
		email: `${firstName}.${lastName}@gmail.com`,
		number: Math.random() * 1e16
	})
	// console.log(postData)
	var options = {
		hostname: 'localhost',
		port: 2333,
		path: '/contactlist',
		method: 'POST',
		headers: {
			'Connection': 'keep-alive',
			'Pragma': 'no-cache',
			'Cache-Control': 'no-cache',
			'Accept': 'application/json, text/plain, */*',
		    'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
			'DNT': 1,
			'Accept-Encoding': 'gzip, deflate, sdch',
			'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2,ja;q=0.2',
		    'Content-Length': Buffer.byteLength(postData)
		}
	}
	var req = http.request(options, (res) => {
		console.log(`STATUS: ${res.statusCode}`);
		// console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			// console.log(`BODY: ${chunk}`);
		});
		res.on('end', () => {
			console.log('No more data in response.')
		})
	});

	req.on('error', (e) => {
		console.log(`problem with request: ${e.message}`);
	});

	// write data to request body
	req.write(postData);
	req.end();


}
console.timeEnd('Add data');
