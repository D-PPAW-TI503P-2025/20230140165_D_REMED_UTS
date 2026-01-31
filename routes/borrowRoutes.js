const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { isUser, isAdmin } = require('../middleware/auth');

// User route
router.post('/', isUser, borrowController.borrowBook);

// Admin route
router.get('/logs', isAdmin, borrowController.getLogs);

module.exports = router;
