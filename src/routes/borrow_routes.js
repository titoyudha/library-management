const express = require('express');
const { borrowBook, returnBook } = require('../controllers/borrow_controller');

const router = express.Router();

/**
 * @swagger
 * /api/borrow:
 *   post:
 *     summary: Borrow a book
 *     requestBody:
 *       description: Borrow object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Borrow created successfully
 */
router.post('/borrow', borrowBook);

/**
 * @swagger
 * /api/return:
 *   post:
 *     summary: Return a book
 *     requestBody:
 *       description: Return object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               borrowId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book returned successfully
 */
router.post('/return', returnBook);

module.exports = router;
