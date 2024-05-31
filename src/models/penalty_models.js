const { DataTypes } = require('sequelize');
const sequelize = require('../config/database_config');
const Member = require('./member_models');

const Penalty = sequelize.define('Penalty', {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Penalty.belongsTo(Member);

module.exports = Penalty;
