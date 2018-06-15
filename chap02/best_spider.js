var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var utilities = require('./utilities');


function download(url, filename, callback){
	console.log('Downloading ' + url);
	request(url, function(err, response, body){
		if(err) {
			return callback(err);
		} 
		saveFile(filename, body, function(err){
			console.log('Downloaded and saved: ' + filename);
			if(err) {
				return callback(err);
			} 
			callback(null, body);
		});
	});
}

function saveFile(filename, contents, callback){
	mkdirp(path.dirname(filename), function(err){
		if(err) {
			return callback(err);
		} 
		fs.writeFile(filename, contents, callback);	
	});
};

function spider(url, callback) {
	var filename = utilities.urlToFilename(url);
	fs.exists(filename, function(exists) { //[1]

		if(exists) {
			return callback(null, filename, true);	
		}
		
		download(url, filename, function(err){
			if(err){
				return callback(err);
			}
			callback(null, filename, true);
		})
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