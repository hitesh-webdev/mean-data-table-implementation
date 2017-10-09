var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    city: {type: String, required: true} 
});

module.exports = mongoose.model('Employee', schema);