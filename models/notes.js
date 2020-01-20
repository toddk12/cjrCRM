const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Notes = sequelize.define('notes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    enteredID: {
        type: Sequelize.INTEGER
    },
    enteredBy: {
        type: Sequelize.STRING
    },
    entryDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    note: { type: Sequelize.STRING }
});

module.exports = Notes;