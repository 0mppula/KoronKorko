const asyncHandler = require('express-async-handler');

// @desc    Get Plans
// @route   GET /api/plans
// @access  Private
const getPlans = asyncHandler(async (req, res) => {
	res.status(200).json({ plan: 'plan_1' });
});

// @desc    Post a Plan
// @route   POST /api/plans
// @access  Private
const postPlan = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		res.status(400);
		throw new Error('Please provide a name for your plan');
	}
	res.status(200).json({ plan: 'posted a new plan' });
});

// @desc    Update a Plan
// @route   PUT /api/plans/:id
// @access  Private
const updatePlan = asyncHandler(async (req, res) => {
	res.status(200).json({ plan: `Updated plan ${req.params.id}` });
});

// @desc    Delete a Plan
// @route   DELETE /api/plans/:id
// @access  Private
const deletePlan = asyncHandler(async (req, res) => {
	res.status(200).json({ plan: `Deleted plan ${req.params.id}` });
});

module.exports = {
	getPlans,
	postPlan,
	updatePlan,
	deletePlan,
};
