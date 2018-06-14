const EventEmitter = require('events');
var fs = require('fs');

class MyStream extends EventEmitter {

	constructor(regex) {
		super();
    	this.regex = regex;    	
    	this.files = [];
  	}

	write(data){
		this.emit('data', data);
		return this;
	}

	addFile(file){
		console.log(file);
		this.files.push(file);
		return this;
	}

	find(){
		var self = this;
		self.files.forEach(function(file) {
			fs.readFile(file, 'utf8', function(err, content) {
				if(err) return self.emit('error', err);
				self.emit('fileread', file);
				var match = null;
				if(match = content.match(self.regex))
					match.forEach(function(elem) {
						self.emit('found', file, elem);
					});
				});
		});
		return this;
	}
}

const stream = new MyStream(/hello \w+/);

stream
	.addFile('fileA.txt')
	.addFile('fileB.json')
	.find()
	.on('found', function(file, match) {
		console.log('Matched "' + match + '" in file ' + file);
	})
	.on('error', function(err) {
		console.log('Error emitted ' + err.message);
	})
	.on('data', (data) => {
		console.log(`Received data: "${data}"`);
	});
		

// Received data: "It works!"
stream.write('It works with ES6!');
	
 