const mongoose = require('module');

const presentValueCalculationSchema = mongoose.Schema(
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
			duration: { type: Number, max: 200 },
			durationMultiplier: { value: { type: Number }, label: { type: String } },
			discountRate: { type: Number },
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Present_Value_Calculation', presentValueCalculationSchema);
