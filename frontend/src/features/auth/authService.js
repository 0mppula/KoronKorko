import axios from 'axios';

const API_URL = '/api/users/';

// Register user
const register = async (userData) => {
	const response = await axios.post(`${API_URL}register`, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Login user
const login = async (userData) => {
	const response = await axios.post(`${API_URL}login`, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Logout user
const logout = () => {
	localStorage.removeItem('user');
};

// Update users currency preferences
const updateUserCurrency = async (user, userData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${user.token}`,
		},
	};

	const response = await axios.put(`${API_URL}me/preferences/currency`, userData, config);
	if(response.data) {
		const updatedUser = {...user, preferences: response.data}
		localStorage.setItem('user', JSON.stringify(updatedUser));
	}

	return response.data
};

const authService = {
	register,
	logout,
	login,
	updateUserCurrency,
};

export default authService;
