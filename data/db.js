const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://dbUser:xoxogossip@cluster0-xxx9b.mongodb.net/test?retryWrites=true&w=majority';
const plasticSchema = require('../schemas/plastic');
const gossipSchema = require('../schemas/gossip');

const connection = mongoose.createConnection(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    Plastic: connection.model('Plastics', plasticSchema),
    Gossip: connection.model('Gossips', gossipSchema) 
};