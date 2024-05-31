const { DataTypes } = require('sequelize');
const sequelize = require('../config/database_config');
const Book = require('./book_models');
const Member = require('./member_models');

const Borrow = sequelize.define('Borrow', {
  borrowedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Borrow.belongsTo(Book);
Borrow.belongsTo(Member);

module.exports = Borrow;
