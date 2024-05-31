const Penalty = require('../models/penalty_models');

const getAllPenalties = async (req, res) => {
  try {
    const penalties = await Penalty.findAll();
    res.json(penalties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPenalties,
};
