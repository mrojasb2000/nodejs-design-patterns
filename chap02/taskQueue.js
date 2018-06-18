module.exports = TaskQueue;

function TaskQueue(concurrency) {
	this.concurrency = concurrency;
	this.running = 0;
	this.queue = [];
}


TaskQueue.prototype.pushTask = function(task, callback) {
	this.queue.push(task);	
	this.next();
}


TaskQueue.prototype.next = function() {
	var self = this;
	console.log('Running     :', self.running);
	console.log('Concurrency :', self.concurrency);
	console.log('Queue length:', self.queue.length);
	while(self.running < self.concurrency && self.queue.length) {
		var task = self.queue.shift();
		task(function(err){
			self.running--;
			self.next();
		});
		self.running++;
	}
}