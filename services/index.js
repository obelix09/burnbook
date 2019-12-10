const db = require('../data/db');

const blackbookService = () => {
    const getAllGossip = async () => {
        const result = await db.Gossip.find({});
        return {
            status: 200,
            body: result
        };
    };

    return {
        getAllGossip
    };
};

module.exports = blackbookService();