const db = require('../data/db');

const burnbookService = () => {
    const getAllGossip = async () => {
        const result = await db.Gossip.find({});
        console.log("blob1");
        return result
    };

    return { 
        getAllGossip
    };
};

module.exports = burnbookService();