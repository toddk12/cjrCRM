const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Trades = sequelize.define('trades', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    enteredBy: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    entryDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    trade: { type: Sequelize.STRING }
});

module.exports = Trades;