const mongoose = require('mongoose');

const BreakEvenPointCalculationShema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: [true, 'Please name your calculation'],
			maxlength: [30, 'The maximum character length for names is 30'],
		},
		formData: {
			fixedCosts: { type: Number, min: 0 },
			pricePerUnit: { type: Number, min: 0 },
			variableCostsPerUnit: { type: Number, min: 0 },
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Break_Even_Point_Calculation', BreakEvenPointCalculationShema);
