const Schema = require('mongoose').Schema;

module.exports = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
});