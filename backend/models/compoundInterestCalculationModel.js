const mongoose = require('mongoose');

const compoundInterestCalculationSchema = mongoose.Schema(
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
			compoundFrequency: { value: { type: Number }, label: { type: String } },
			contribution: { type: Number, min: 0 },
			contributionFrequency: { value: { type: Number }, label: { type: String } },
			contributionMultiplier: { type: Number, min: -1, max: 1 },
			duration: { type: Number, min: 0 },
			durationMultiplier: { value: { type: Number }, label: { type: String } },
			interestRate: { type: Number, min: 0 },
			startingBalance: { type: Number, min: 0 },
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Compound_Interest_Calculation', compoundInterestCalculationSchema);
