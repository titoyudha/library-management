const Book = require('./book_controllers');
const Member = require('./member_controller');

const borrowBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    // Check if member exists and is not penalized
    const member = await Member.findByPk(memberId);
    if (!member || member.penalty) {
      return res.status(400).json({ message: 'Member not found or penalized' });
    }

    // Check if member has borrowed more than 2 books
    const borrowCount = await Book.count({
      where: { borrowedBy: memberId, returnedAt: null },
    });
    if (borrowCount >= 2) {
      return res
        .status(400)
        .json({ message: 'Cannot borrow more than 2 books' });
    }

    // Check if the book is available
    const book = await Book.findByPk(bookId);
    if (!book || book.borrowedBy || book.stock <= 0) {
      return res.status(400).json({ message: 'Book not available' });
    }

    // Update book status
    await book.update({
      borrowedBy: memberId,
      borrowedAt: new Date(),
      stock: book.stock - 1,
    });

    res.status(200).json({ message: 'Book borrowed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    // Find the borrowed book
    const book = await Book.findOne({
      where: { id: bookId, borrowedBy: memberId, returnedAt: null },
    });
    if (!book) {
      return res.status(400).json({ message: 'No active borrow record found' });
    }

    // Calculate days borrowed
    const borrowedAt = new Date(book.borrowedAt);
    const returnedAt = new Date();
    const daysBorrowed = Math.floor(
      (returnedAt - borrowedAt) / (1000 * 60 * 60 * 24)
    );

    // Penalize if book returned after 7 days
    if (daysBorrowed > 7) {
      await Member.update({ penalty: true }, { where: { id: memberId } });
      return res
        .status(400)
        .json({ message: 'Member penalized for returning the book late' });
    }

    // Update book status
    await book.update({ returnedAt, borrowedBy: null, stock: book.stock + 1 });

    res.status(200).json({ message: 'Book returned' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkBooks = async (req, res) => {
  try {
    // Show all books except those currently borrowed
    const books = await Book.findAll({ where: { borrowedBy: null } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  checkBooks,
};
