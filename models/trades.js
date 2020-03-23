const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Trades = sequelize.define('trades', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    trade: { type: Sequelize.STRING }
});

module.exports = Trades;