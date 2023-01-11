const express = require('express');
const router = express.Router();

const {
	getCalculation,
	getCalculations,
	deleteCalculation,
	postCalculation,
	putCalculation,
} = require('../controllers/AnnualizedReturnCalculationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, postCalculation).get(protect, getCalculations);

router
	.route('/:id')
	.put(protect, putCalculation)
	.get(protect, getCalculation)
	.delete(protect, deleteCalculation);

module.exports = router;
