const sequelize = require('../config/database_config');
const { DataTypes } = require('sequelize');
const Book = require('../models/book_models');

module.exports = () => {
  const Member = sequelize.define('Member', {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    penalized: DataTypes.BOOLEAN,
    penalizedUntil: DataTypes.DATE,

    associate: function (models) {
      Member.hasMany(Book, {
        foreignKey: 'borrowedBy',
        as: 'borrowedBooks',
      });
    },
  });

  return Member;
};
