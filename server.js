'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// CORS
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

// Basic setup
var port = process.env.PORT || 3333;

// Database & ORM-Mapper
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017');

// Models
var Attendee = require('./app/models/attendee');

// Routing
var router = express.Router();

// Routes
router.get('/', function(req, res) {
	res.json('SUUUUUUUUUP?!');
});

router.route('/attendee')
	// create attendee
	.post(function(req, res) {
		var attendee = new Attendee();
		attendee.name = req.body['signup-name'];
		attendee.mail = req.body['signup-mail'];
		attendee.role = req.body['signup-role'];

		attendee.save(function(err) {
			if (err)
				res.send(err);
			res.json({ 'message': 'attendee created' })
		});
	});

app.use('/', router);

app.listen(port);
console.log('Server started. Listening on http://127.0.0.1:' + port);