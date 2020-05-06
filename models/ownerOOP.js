const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Owneroop = sequelize.define('owneroop', {
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
    oopAmt: { type: Sequelize.FLOAT(10, 2) },
    oopMemo: { type: Sequelize.STRING },

});

module.exports = Owneroop;