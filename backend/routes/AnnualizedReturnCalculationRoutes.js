const express = require('express');
const router = express.Router();

const { getCalculations } = require('../controllers/AnnualizedReturnCalculationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCalculations);

module.exports = router;
