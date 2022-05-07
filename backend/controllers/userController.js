const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password, darkMode } = req.body;

	// Check fields
	if (!username || !email || !password) {
		res.status(400);
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
		preferences: {
			darkMode,
		},
	});

	// check if user is created successfully
	if (user) {
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			preferences: user.preferences,
			token: generateToken(user._id),
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
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			preferences: user.preferences,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

// @desc    Update user currency preferences
// @route   PUT /api/users/me/preferences/currency
// @access  Private
const updateUserPreferences = asyncHandler(async (req, res) => {
	// Check if user exists
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}
	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		{ preferences: req.body },
		{ new: true }
	);
	res.status(200).json(updatedUser.preferences);
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUserData = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = {
	registerUser,
	loginUser,
	getUserData,
	updateUserPreferences,
};
