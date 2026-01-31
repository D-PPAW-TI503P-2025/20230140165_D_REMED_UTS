const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Admin routes
router.post('/', isAdmin, bookController.createBook);
router.put('/:id', isAdmin, bookController.updateBook);
router.delete('/:id', isAdmin, bookController.deleteBook);

module.exports = router;
