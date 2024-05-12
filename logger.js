// logger.js

const bunyan = require("bunyan");

var logger = bunyan.createLogger({
	name: "pindie",
	streams: [
		{
			level: "debug",
			stream: process.stdout,
		},
		{
			level: "info",
			type: "rotating-file",
			path: "./logs/pindie.log",
			period: "1d",
			count: 14,
		},
	],
});

module.exports = { logger };
