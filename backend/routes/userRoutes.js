const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getUserData,
	updateUserPreferences,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserData);
router.put('/me/preferences/currency', protect, updateUserPreferences);

module.exports = router;
