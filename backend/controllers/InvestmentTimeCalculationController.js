const asyncHandler = require('express-async-handler');

const calculatorModel = require('../models/InvestmentTimeCalculatorModel');

// @desc    Post a Investment Time Calculation
// @route   POST /api/investment-time-calculations
// @access  Private
const postCalculation = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error('Please provide a name for your calculation.');
	}

	const calculation = await calculatorModel.create({
		user: req.user.id,
		name: req.body.name,
		formData: req.body.formData,
	});

	res.status(200).json(calculation);
});

// @desc GET Investment Time Calculations
// @route GET /api/investment-time-calculations
// @acces Private
const getCalculations = asyncHandler(async (req, res) => {
	const calculations = await calculatorModel.find({ user: req.user.id });

	res.status(200).json(calculations);
});

// @desc GET a Investment Time Calculation
// @route GET /api/investment-time-calculations/:id
// @acces Private
const getCalculation = asyncHandler(async (req, res) => {
	const calculation = await calculatorModel.findById(req.params.id);

	if (!calculation) {
		res.status(400);
		throw new Error('Calculation does not exist.');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found.');
	}

	// Make sure the logged in user matches the calculation owner
	if (calculation.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized.');
	}

	res.status(200).json(calculation);
});

// @desc Update a Investment Time Calculation
// @route PUT /api/investment-time-calculations/:id
// @acces Private
const putCalculation = asyncHandler(async (req, res) => {
	const calculation = await calculatorModel.findById(req.params.id);

	if (!calculation) {
		res.status(400);
		throw new Error('Calculation does not exist.');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found.');
	}

	// Make sure the logged in user matches the calculation owner
	if (calculation.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized.');
	}

	// If updating only name
	if (req.body.name) {
		const updatedCalculation = await calculatorModel.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: { name: req.body.name.trim() } },
			{ new: true }
		);

		res.status(200).json(updatedCalculation);
		return;
	}

	const updatedCalculation = await calculatorModel.findByIdAndUpdate(
		{ _id: req.params.id },
		{ $set: { formData: req.body.formData } },
		{ new: true }
	);

	res.status(200).json(updatedCalculation);
});

// @desc Delete a Investment Time Calculation
// @route DELETE /api/investment-time-calculations/:id
// @acces Private
const deleteCalculation = asyncHandler(async (req, res) => {
	const calculation = await calculatorModel.findById(req.params.id);

	if (!calculation) {
		res.status(400);
		throw new Error('Calculation does not exist.');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found.');
	}

	// Make sure the logged in user matches the calculation owner
	if (calculation.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized.');
	}

	await calculation.remove();

	res.status(200).json({ id: req.params.id, name: calculation.name });
});

module.exports = {
	postCalculation,
	getCalculations,
	getCalculation,
	putCalculation,
	deleteCalculation,
};
