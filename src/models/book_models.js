const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database_config');
const Member = require('../models/member_models');

const Book = sequelize.define(
  'Book',
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    borrowedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    returnedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    // Define association
    associate: function (models) {
      Book.belongsTo(Member, {
        foreignKey: 'borrowedBy',
        as: 'borrower',
      });
    },
  }
);

module.exports = Book;
