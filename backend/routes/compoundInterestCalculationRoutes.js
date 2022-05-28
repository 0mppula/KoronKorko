const express = require('express');
const router = express.Router();
const {
	postCalculation,
	getCalculations,
	putCalculation,
	deleteCalculation,
} = require('../controllers/compoundInterestCalculationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, postCalculation).get(protect, getCalculations);

router.route('/:id').put(protect, putCalculation).delete(protect, deleteCalculation);

module.exports = router;
