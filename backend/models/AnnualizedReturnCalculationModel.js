const mongoose = require('mongoose');

const annualizedReturnCalculationShema = mongoose.Schema(
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
			startingBalance: { type: Number, min: 0 },
			endingBalance: { type: Number },
			duration: { type: Number, max: 200 },
			durationMultiplier: { value: { type: Number }, label: { type: String } },
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Annualized_Return_Calculation', annualizedReturnCalculationShema);
