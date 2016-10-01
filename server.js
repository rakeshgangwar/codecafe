var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('./'));

app.get('/', function (req, res) {

	res.sendFile(path.resolve('./index.html'));

});

app.listen(1111, function() {
	console.log('mAGIC HAPPENING AT 1111');
});
