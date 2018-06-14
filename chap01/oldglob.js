var glob = require('glob');

glob('*.txt', function(error, files) {
	console.log('All files found: ' + JSON.stringify(files));
}).on('match', function(match) {
	console.log('Match found: ' + match);
});