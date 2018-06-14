var crypto = require("crypto");

function urlToFilename(url) {	
	return crypto.randomBytes(20).toString('hex');
}

module.exports.urlToFilename = urlToFilename;