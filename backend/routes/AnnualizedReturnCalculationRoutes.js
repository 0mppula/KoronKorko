const express = require('express');
const router = express.Router();

const {
	getCalculation,
	getCalculations,
	deleteCalculation,
} = require('../controllers/AnnualizedReturnCalculationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCalculations);

router.route('/:id').get(protect, getCalculation).delete(protect, deleteCalculation);

module.exports = router;
