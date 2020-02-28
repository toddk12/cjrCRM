const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Wtb = sequelize.define('wtb', {
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
    line: { type: Sequelize.STRING },
    rcv: { type: Sequelize.STRING },
    op: { type: Sequelize.STRING },
    net: { type: Sequelize.STRING }
});

module.exports = Wtb;