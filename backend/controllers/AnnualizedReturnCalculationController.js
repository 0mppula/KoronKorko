const asyncHandler = require('express-async-handler');

const AnnualizedReturnCalculation = require('../models/AnnualizedReturnCalculationModel');

// @desc GET Annualized Return Calculations
// @route GET /api/annualized-return-calculations
// @acces Private
const getCalculations = asyncHandler(async (req, res) => {
	const calculations = await AnnualizedReturnCalculation.find({ user: req.user.id });

	res.status(200).json(calculations);
});

// @desc GET a Annualized Return Calculation
// @route GET /api/annualized-return-calculations/:id
// @acces Private
const getCalculation = asyncHandler(async (req, res) => {
	const calculation = await AnnualizedReturnCalculation.findById(req.params.id);

	if (!calculation) {
		res.status(400);
		throw new Error('Calculation does not exist');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the calculation owner
	if (calculation.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	res.status(200).json(calculation);
});

// @desc Delete a Annualized Return Calculation
// @route DELETE /api/annualized-return-calculations/:id
// @acces Private
const deleteCalculation = asyncHandler(async (req, res) => {
	const calculation = await AnnualizedReturnCalculation.findById(req.params.id);

	if (!calculation) {
		res.status(400);
		throw new Error('Calculation does not exist');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the calculation owner
	if (calculation.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await calculation.remove();

	res.status(200).json({ id: req.params.id, name: calculation.name });
});

module.exports = {
	getCalculations,
	getCalculation,
	deleteCalculation,
};
