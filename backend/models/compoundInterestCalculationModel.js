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
		},
		formData: {
			compoundFrequency: { value: { type: Number }, label: { type: String } },
			contribution: { type: Number, min: 0 },
			contributionFrequency: { value: { type: Number }, label: { type: String } },
			contributionMultiplier: { type: Number, min: 0 },
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
