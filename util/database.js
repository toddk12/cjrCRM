const Sequelize = require('sequelize');

const sequelize = new Sequelize('cjdatabase', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;