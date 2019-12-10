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

    return { 
        getAllGossip,
        createGossip
    };
};

module.exports = burnbookService();