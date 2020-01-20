const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const OwnerOop = sequelize.define('ownerOop', {
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
    oopAmt: { type: Sequelize.DECIMAL(10, 2) },
    oopMemo: { type: Sequelize.STRING },

});

module.exports = OwnerOop;