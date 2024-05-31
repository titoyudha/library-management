const { DataTypes } = require('sequelize');
const sequelize = require('../config/database_config');

const Member = sequelize.define('Member', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Member;
