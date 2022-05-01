const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please add a name'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
		},
		preferences: {
			darkMode: Boolean,
			currency: {
				name: { type: String, default: 'dollar' },
				value: { type: String, default: 'usd' },
				label: { type: String, default: '$' },
				locale: { type: String, default: 'en-US' },
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
