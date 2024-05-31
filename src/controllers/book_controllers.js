const Book = require('../models/book_models');

const getAllBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

const getAvailableBooks = async (req, res) => {
  const books = await Book.findAll({ where: { stock: { [Op.gt]: 0 } } });
  res.json(books);
};

module.exports = {
  getAllBooks,
  getAvailableBooks,
};
