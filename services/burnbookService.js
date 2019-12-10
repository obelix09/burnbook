const db = require('../data/db');

const burnbookService = () => {
    const getAllGossip = async () => {
        const result = await db.Gossip.find({});
        return result
    };

    const createGossip = async (gossip) => {
        const result = await db.Gossip.create(gossip);
        return result
    };

    const getGossipByName = async (dbname) => {
        console.log("wtf is this " + dbname)
        const result = await db.Gossip.find({name: dbname})
        console.log("results are in" + result)
        return result
    }

    return { 
        getAllGossip,
        createGossip,
        getGossipByName
    };
};

module.exports = burnbookService();