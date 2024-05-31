const express = require('express');
const {
  getAllBooks,
  getAvailableBooks,
} = require('../controllers/book_controllers');

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/books/available', getAvailableBooks);

module.exports = router;
