const mongoose = require('mongoose');

const planSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
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
