import axios from 'axios';

// Create a new calculation.
const createCalculation = async (apiUrl, calculationData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(apiUrl, calculationData, config);

	return response.data;
};

// Get the calculations of a user.
const getCalculations = async (apiUrl, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(apiUrl, config);
	return response.data;
};

// Get a users calculations with an id.
const getCalculation = async (apiUrl, calculationId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(`${apiUrl}${calculationId}`, config);
	return response.data;
};

// Update a users calculation.
const updateCalculation = async (apiUrl, calculationId, calculationData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(`${apiUrl}${calculationId}`, calculationData, config);
	return response.data;
};

// Update a users calculation name.
const renameCalculation = async (apiUrl, calculationId, calculationData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(`${apiUrl}${calculationId}`, calculationData, config);

	return response.data;
};

// Delete a users calculation.
const deleteCalculation = async (apiUrl, calculationId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(`${apiUrl}${calculationId}`, config);
	return response.data;
};

const calculatorService = {
	getCalculations,
	getCalculation,
	deleteCalculation,
	createCalculation,
	updateCalculation,
	renameCalculation,
};

export default calculatorService;
