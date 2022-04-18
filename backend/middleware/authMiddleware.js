const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
	let token;

	// Check if the http header of the request contains an authorization object that starts with
	// "Bearer" the token is send in the authorization header like this "Bearer" "token"
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// Get the token from the http authorization header
			token = req.headers.authorization.split(' ')[1];

			// Verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Re-assingn req.user with the id from the token excluding the password
      // Now req.user is available in other controller functions that user the same token
			req.user = await User.findById(decoded.id).select('-password');

			// Call the next piece of middleware
			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Not authorized');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized not token');
	}
});

module.exports = { protect };
