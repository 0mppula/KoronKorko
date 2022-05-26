const express = require('express');
const router = express.Router();
const { postCalculation } = require('../controllers/compoundInterestCalculationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, postCalculation);

module.exports = router;
