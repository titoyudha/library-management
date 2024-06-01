const Book = require('../models/book_models');
const Member = require('../models/member_models');

const memberCheck = async (req, res) => {
  try {
    // Show all members and the number of books each member has borrowed
    const members = await Member.findAll({
      include: [
        {
          model: Book,
          attributes: ['id'],
          where: { returnedAt: null },
        },
      ],
    });

    const membersInfo = members.map((member) => ({
      id: member.id,
      name: member.name,
      borrowedBooksCount: member.Books.length,
    }));

    res.json(membersInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  memberCheck,
};
