const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Fundsrcvd = sequelize.define('fundsrcvd', {
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
    fundsAmt: { type: Sequelize.FLOAT(10, 2) },
    fundsDescription: { type: Sequelize.STRING }
});

module.exports = Fundsrcvd;