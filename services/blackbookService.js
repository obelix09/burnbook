const db = require('../data/db');

const blackbookService = () => {
    const getAllGossip = async () => {
        const result = await db.Gossip.find({});
        return result
    };

    return {
        getAllGossip
    };
};

module.exports = blackbookService();