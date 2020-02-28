const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Wtb = sequelize.define('wtb', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    line: { type: Sequelize.STRING },
    rcv: { type: Sequelize.FLOAT(10, 2) },
    op: { type: Sequelize.FLOAT(10, 2) },
    net: { type: Sequelize.FLOAT(10, 2) }
});

module.exports = Wtb;