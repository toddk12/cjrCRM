const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Reppay = sequelize.define('reppay', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    enteredBy: Sequelize.STRING,
    entryDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    payAmt: { type: Sequelize.FLOAT(10, 2) },
    description: { type: Sequelize.STRING }
});

module.exports = Reppay;