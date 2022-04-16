const asyncHandler = require('express-async-handler');
const Plan = require('../models/planModel');

// @desc    Get Plans
// @route   GET /api/plans
// @access  Private
const getPlans = asyncHandler(async (req, res) => {
	const plans = await Plan.find();

	res.status(200).json(plans);
});

// @desc    Post a Plan
// @route   POST /api/plans
// @access  Private
const postPlan = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error('Please provide a name for your plan');
	}

	const plan = await Plan.create({
		name: req.body.name,
	});

	res.status(200).json(plan);
});

// @desc    Update a Plan
// @route   PUT /api/plans/:id
// @access  Private
const updatePlan = asyncHandler(async (req, res) => {
	const plan = await Plan.findById(req.params.id);

	if (!plan) {
		res.status(400);
		throw new Error('Plan not found');
	}

	const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });

	res.status(200).json(updatedPlan);
});

// @desc    Delete a Plan
// @route   DELETE /api/plans/:id
// @access  Private
const deletePlan = asyncHandler(async (req, res) => {
	const plan = await Plan.findById(req.params.id);

	if (!plan) {
		res.status(400);
		throw new Error('Plan not found');
	}

	await plan.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getPlans,
	postPlan,
	updatePlan,
	deletePlan,
};
