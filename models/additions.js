const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Additions = sequelize.define('additions', {
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
    tradeName: Sequelize.STRING,
    addAmt: { type: Sequelize.FLOAT(10, 2) },
    addMemo: { type: Sequelize.STRING },
});

module.exports = Additions;