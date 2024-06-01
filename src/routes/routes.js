const express = require('express');
const router = express.Router();
const {
  checkBooks,
  borrowBook,
  returnBook,
} = require('../controllers/book_controllers');
const { memberCheck } = require('../controllers/member_controller');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieves a list of available books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of available books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   stock:
 *                     type: integer
 *                   borrowedAt:
 *                     type: string
 *                     format: date-time
 *                   returnedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/api/books', checkBooks);

/**
 * @swagger
 * /api/books/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Books]
 *     requestBody:
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
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/api/books/borrow', borrowBook);

/**
 * @swagger
 * /api/books/return:
 *   post:
 *     summary: Return a book
 *     tags: [Books]
 *     requestBody:
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
 *       200:
 *         description: Book returned
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/api/books/return', returnBook);

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member management
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Retrieves a list of members and their borrowed book counts
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of members and their borrowed book counts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   borrowedBooksCount:
 *                     type: integer
 */
router.get('/api/members', memberCheck);

module.exports = router;
