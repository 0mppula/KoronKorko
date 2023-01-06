const asyncHandler = require('express-async-handler');

const AnnualizedReturnCalculation = require('../models/AnnualizedReturnCalculationModel');

// @desc GET Annualized Return Calculations
// @route GET /api/annualized-return-calculations
// @acces Private
const getCalculations = asyncHandler(async (req, res) => {
	const calculations = await AnnualizedReturnCalculation.find({ user: req.user.id });

	res.status(200).json(calculations);
});

module.exports = {
	getCalculations,
};
