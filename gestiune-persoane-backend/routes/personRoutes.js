const express = require('express');
const {
  createPerson,
  getPersons,
  getPerson,
  updatePerson,
  deletePerson,
  getAllPersons,
} = require('../controllers/personController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Protected routes (user)
router.post('/', authenticateToken, createPerson);
router.get('/', authenticateToken, getPersons);
router.get('/:id', authenticateToken, getPerson);
router.put('/:id', authenticateToken, updatePerson);
router.delete('/:id', authenticateToken, deletePerson);

// Admin routes
router.get('/admin/all', authenticateToken, authorizeAdmin, getAllPersons);

module.exports = router;
