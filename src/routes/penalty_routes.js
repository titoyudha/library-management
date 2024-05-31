const express = require('express');
const { getAllPenalties } = require('../controllers/penalty_controllers');

const router = express.Router();

/**
 * @swagger
 * /api/penalties:
 *   get:
 *     summary: Get all penalties
 *     responses:
 *       200:
 *         description: List of all penalties
 */
router.get('/penalties', getAllPenalties);

module.exports = router;
