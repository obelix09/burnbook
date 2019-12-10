const Schema = require('mongoose').Schema;

module.exports = new Schema({
    name: {type: String, required: true},
    gossip: {type: String, required: true}
});
