'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// CORS
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.status(200);
      res.send();
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
var mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

mongoose.connect(mongoUri);

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

		attendee.save(function(err, obj) {
			if (err)
				res.send(err);

			res.json({
				'oid':  obj.id
			});
		});
	})
	.get(function(req, res) {
		Attendee.find({}, function(err, docs) {
			var out = 'Attendants: ' + docs.length + '\n';

			for (var doc in docs) {
				out += 'Name: ' + doc.name + '\n';
			}

			res.send(out);
		})
	});

router.route('/attendee/:attendee_id')
	// remove attendant
	.delete(function(req, res) {
		Attendee.remove({
			'_id': req.params.attendee_id
		}, function(err, obj) {
			if (err) {
				res.send(err);
			} else {
				res.json({
					'message': 'successfully removed attendant'
				});
			}
		})
	});

app.use('/', router);

app.listen(port);
console.log('Server started. Listening on http://127.0.0.1:' + port);
