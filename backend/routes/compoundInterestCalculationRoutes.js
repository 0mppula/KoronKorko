const express = require('express');
const router = express.Router();

const {
	postCalculation,
	getCalculations,
	getCalculation,
	putCalculation,
	deleteCalculation,
} = require('../controllers/compoundInterestCalculationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, postCalculation).get(protect, getCalculations);

router
	.route('/:id')
	.put(protect, putCalculation)
	.delete(protect, deleteCalculation)
	.get(protect, getCalculation);

module.exports = router;
