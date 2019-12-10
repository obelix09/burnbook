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

    const getGossipByName = async (name) => {
        console.log(name)
        const result = await db.Gossip.find({name: name})
        return result
    }

    return { 
        getAllGossip,
        createGossip,
        getGossipByName
    };
};

module.exports = burnbookService();