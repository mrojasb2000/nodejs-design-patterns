var EventEmitter = require('events').EventEmitter;

function helloEvents() {
	var eventEmitter = new EventEmitter();
	setTimeout(function() {
		eventEmitter.emit('hello', 'world');
	}, 100);
	
	return eventEmitter;
}

function helloCallback(callback) {
	setTimeout(function() {
		callback('hello', 'world');
	}, 100);
}