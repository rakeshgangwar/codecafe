/**
 * Code Cafe Server
 *
 * A simple Express.js server that serves the Code Cafe web application.
 * This server handles static file serving and routes requests to the main HTML file.
 *
 * @module server
 * @requires express
 * @requires path
 */

var express = require('express');
var app = express();
var path = require('path');

// Serve static files from the root directory
// This allows access to CSS, JS, images, and other static assets
app.use(express.static('./'));

/**
 * Root route handler
 * Serves the main index.html file when accessing the root URL
 *
 * @route GET /
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/', function (req, res) {
	// Send the main HTML file using absolute path resolution
	res.sendFile(path.resolve('./index.html'));
});

/**
 * Start the Express server
 * The server listens on port 1111 by default
 *
 * @constant {number} PORT - The port number the server listens on (1111)
 */
app.listen(1111, function() {
	console.log('mAGIC HAPPENING AT 1111');
});
