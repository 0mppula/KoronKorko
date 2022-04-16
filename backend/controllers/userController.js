const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

  // Check fields
	if (!username || !email || !password) {
		throw new Error('Please add all fields');
	}

	// Check if the user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		username,
		email,
		password: hashedPassword,
	});

  // check if user is created successfully
	if (user) {
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    Login the user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	res.json({ message: 'Login user' });
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Public
const getUserData = asyncHandler(async (req, res) => {
	res.json({ message: 'Get user data' });
});

module.exports = {
	registerUser,
	loginUser,
	getUserData,
};
