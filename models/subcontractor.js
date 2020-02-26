const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Subcontractor = sequelize.define('subcontractor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    coName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: Sequelize.STRING,
    address2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    notes: Sequelize.STRING
});

module.exports = Subcontractor;