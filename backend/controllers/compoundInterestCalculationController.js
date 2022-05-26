const asyncHandler = require('express-async-handler');

const CompoundInterestCalculation = require('../models/compoundInterestCalculationModel');
const User = require('../models/userModel');

// @desc    Post a Compound Interest Calculation
// @route   POST /api/compound-interest-calculations
// @access  Private
const postCalculation = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error('Please provide a name for your compound interest calculation');
	}

	const compoundInterestCalculation = await CompoundInterestCalculation.create({
		user: req.user.id,
		name: req.body.name,
		formData: req.body.formData,
	});

	res.status(200).json(compoundInterestCalculation);
});

module.exports = {
	postCalculation,
};
