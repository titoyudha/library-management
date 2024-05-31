const express = require('express');
const {
  getAllMembers,
  createMember,
} = require('../controllers/member_controller');

const router = express.Router();

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     responses:
 *       200:
 *         description: List of all members
 */
router.get('/members', getAllMembers);

/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: Create a new member
 *     requestBody:
 *       description: Member object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created successfully
 */
router.post('/members', createMember);

module.exports = router;
