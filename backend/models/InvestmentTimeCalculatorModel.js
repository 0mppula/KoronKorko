const mongoose = require('mongoose');

const InvestmentTimeCalculationSchema = mongoose.Schema(
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
			endingBalance: { type: Number, min: 0 },
			interestRate: { type: Number },
			startingBalance: { type: Number, min: 0 },
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Investment_Time_Calculation', InvestmentTimeCalculationSchema);
