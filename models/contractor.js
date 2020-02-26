const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Contractor = sequelize.define('contractor', {
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
    contract: Sequelize.STRING,
    address: Sequelize.STRING,
    address2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    notes: Sequelize.STRING,
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    }
});

module.exports = Contractor;