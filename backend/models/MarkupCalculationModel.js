const mongoose = require('mongoose');

const MarkupCalculationSchema = mongoose.Schema(
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
			cost: { type: Number, min: 0 },
			salesPrice: { type: Number },
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Markup_Calculation', MarkupCalculationSchema);
