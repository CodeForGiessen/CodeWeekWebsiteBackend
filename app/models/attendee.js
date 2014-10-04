'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttendeeSchema = new Schema({
	name: String,
	mail: String,
	role: String
});

module.exports = mongoose.model('Attendee', AttendeeSchema);