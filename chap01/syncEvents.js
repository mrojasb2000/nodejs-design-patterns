var EventEmitter = require('events').EventEmitter;
var util = require('util');

/* Function -> Object */
function SyncEmit() {
	this.emit('ready');
}

util.inherits(SyncEmit, EventEmitter);

/* Function def */
SyncEmit.prototype.emitMe = function() {
	this.emit('ready');
	return this;
};

/*
the event is produced synchronously and the listener is
registered after the event was already sent, so the result is that the listener is never
invoked;
*/
var syncEmit = new SyncEmit();
// Not invoked
syncEmit.emitMe();

syncEmit.on('ready', function() {
	console.log('Object is ready to be used');
});

// Invoked
syncEmit.emitMe();