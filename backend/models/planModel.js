const mongoose = require('mongoose');

const planSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please name your plan'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Plan', planSchema);
