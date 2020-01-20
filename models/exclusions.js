const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Exclusions = sequelize.define('exclusions', {
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
    addAmt: { type: Sequelize.DECIMAL(10, 2) },
    addMemo: { type: Sequelize.STRING },

});

module.exports = Exclusions;