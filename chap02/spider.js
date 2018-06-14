var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var utilities = require('./utilities');

function spider(url, callback) {
	var filename = utilities.urlToFilename(url);
	fs.exists(filename, function(exists) { //[1]
		if(!exists) {
			console.log("Downloading " + url);
			request(url, function(err, response, body) { //[2]
			if(err) {
				callback(err);
			} else {
				mkdirp(path.dirname(filename), function(err) { //[3]
				if(err) {
					callback(err);
				} else {
					fs.writeFile(filename, body, function(err) { //[4]
						if(err) {
							callback(err);
						} else {
							callback(null, filename, true);
						}
					});
					}
				});
			}
		});
		} else {
			callback(null, filename, false);
		}
	});
}

// Run: node spider http://www.example.com
spider(process.argv[2], function(err, filename, downloaded) {
	if(err) {
		console.log(err);
	} else if(downloaded){
		console.log('Completed the download of "'+ filename +'"');
	} else {
		console.log('"'+ filename +'" was already downloaded');
	}
});