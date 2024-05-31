const Member = require('../models/member_models');
const Borrow = require('../models/borrow_models');

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll({
      include: {
        model: Borrow,
        attributes: ['id'],
      },
    });
    res.json(
      members.map((member) => ({
        id: member.id,
        code: member.code,
        name: member.name,
        borrowedBooksCount: member.Borrows.length,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMember = async (req, res) => {
  try {
    const { code, name } = req.body;
    const member = await Member.create({ code, name });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMembers,
  createMember,
};
