const { Op } = require('sequelize');
const Borrow = require('../models/borrow_models');
const Book = require('../models/book_models');
const Member = require('../models/member_models');
const Penalty = require('../models/penalty_models');
const { addDays, isAfter } = require('../utils/dateUtils');

const borrowBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const member = await Member.findByPk(memberId, {
      include: [{ model: Borrow }, { model: Penalty }],
    });
    if (!member) return res.status(404).json({ error: 'Member not found' });

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const currentDate = new Date();

    // Check penalties
    const penalties = member.Penalties.filter((penalty) =>
      isAfter(currentDate, penalty.endDate)
    );
    if (penalties.length > 0) {
      return res.status(403).json({ error: 'Member is currently penalized' });
    }

    // Check borrowed books count
    if (member.Borrows.length >= 2) {
      return res.status(403).json({ error: 'Cannot borrow more than 2 books' });
    }

    // Check if book is already borrowed
    const existingBorrow = await Borrow.findOne({
      where: {
        bookId,
        returnedAt: { [Op.is]: null },
      },
    });
    if (existingBorrow) {
      return res.status(403).json({ error: 'Book is already borrowed' });
    }

    const borrow = await Borrow.create({
      bookId,
      memberId,
      borrowedAt: currentDate,
    });

    book.stock -= 1;
    await book.save();

    res.status(201).json(borrow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findByPk(borrowId, {
      include: [Book, Member],
    });
    if (!borrow) return res.status(404).json({ error: 'Borrow not found' });

    if (borrow.returnedAt) {
      return res.status(400).json({ error: 'Book is already returned' });
    }

    const currentDate = new Date();
    const borrowDate = new Date(borrow.borrowedAt);
    const dueDate = addDays(borrowDate, 7);

    borrow.returnedAt = currentDate;
    await borrow.save();

    const book = borrow.Book;
    book.stock += 1;
    await book.save();

    if (isAfter(currentDate, dueDate)) {
      const penaltyEndDate = addDays(currentDate, 3);
      await Penalty.create({
        memberId: borrow.memberId,
        startDate: currentDate,
        endDate: penaltyEndDate,
      });
    }

    res.status(200).json(borrow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  borrowBook,
  returnBook,
};
