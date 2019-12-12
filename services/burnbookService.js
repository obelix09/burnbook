const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const connectionString = 'mongodb+srv://dbUser:xoxogossip@cluster0-xxx9b.mongodb.net/BurnBook?retryWrites=true&w=majority';

const burnbookService = () => {

    const getGossipByName = async (dbname) => {
        let query = {
            name: dbname
        }
        var result;
        const connection = MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err, client) {
            if (err) { throw new Error(err); }
            const db = client.db('BurnBook');
            const gossips = db.collection('gossips')
            gossips.find(query).toArray(function (err, items) {
                if (err) { throw new Error(err); }
                console.log(items);
                result = items;
            });
            client.close();
        });
        console.log("wtf is this " + dbname)
        console.log("results are in" + result)
        return result;
    }

    const getAllGossip = () => {
        let gossips;
        const connection = MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err, client) {
            if (err) { throw new Error(err); }
            const db = client.db('BurnBook');
            gossips = db.collection('gossips')
            gossips.find({}).toArray(function (err, items) {
                if (err) { throw new Error(err); }
                console.log("*** ITEMS: **** " + items);
            });
            client.close();
        });
        console.log("results are in " + gossips)
        return gossips;
    }

    return {
        getGossipByName,
        getAllGossip
    };
};

module.exports = burnbookService();