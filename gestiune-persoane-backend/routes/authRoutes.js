const express = require('express');
const { register, login, getCurrentUser, getAllUsers } = require('../controllers/authController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticateToken, getCurrentUser);

// Admin routes
router.get('/users', authenticateToken, authorizeAdmin, getAllUsers);

module.exports = router;
