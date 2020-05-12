const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Rtype = sequelize.define('rtype', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    title: Sequelize.STRING
});

module.exports = Rtype;