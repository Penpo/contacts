'use strict';
var http = require('http');
var querystring = require('querystring');

	var array = [];
	var options = {
		hostname: 'localhost',
		port: 2333,
		path: '/contactlist',
		method: 'GET',
		headers: {
			'Cache-Control': 'no-cache',
			'Accept': 'application/json, text/plain, */*',
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
			'DNT': 1,
			'Accept-Encoding': 'gzip, deflate, sdch',
			'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2,ja;q=0.2'
		}
	}
	var output  = '';
	var req = http.request(options, (res) => {
		console.log(`STATUS: ${res.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			output += chunk
			// console.log(array.length);
		});
		res.on('end', () => {
			array = JSON.parse(output);
			console.log(array.length);

			console.time('Delete Time');
			for (var i = 10; i < array.length; i++) {
				var options = {
					hostname: 'localhost',
					port: 2333,
					path: '/contactlist/' + array[i]._id,
					method: 'DELETE',
					headers: {
						'Connection': 'keep-alive',
						'Pragma': 'no-cache',
						'Cache-Control': 'no-cache',
						'Accept': 'application/json, text/plain, */*',
						'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
						'DNT': 1,
						'Accept-Encoding': 'gzip, deflate, sdch',
						'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2,ja;q=0.2'
					}
				}
				var req = http.request(options, (res) => {
					console.log(`STATUS: ${res.statusCode}`);
					console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
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
				req.write('hello');
				req.end();


			}

			console.timeEnd('Delete Time');
		})
	});

	req.on('error', (e) => {
		console.log(`problem with request: ${e.message}`);
	});

	// write data to request body
	// req.write('anything');
	req.end();
(function() {
})();
