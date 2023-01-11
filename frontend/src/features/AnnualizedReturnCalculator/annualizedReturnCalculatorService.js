import axios from 'axios';

const API_URL = '/api/annualized-return-calculations/';

// Create new calculation
const createCalculation = async (calculationData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, calculationData, config);

	return response.data;
};

const getCalculations = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
	return response.data;
};

const getCalculation = async (calculationId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(`${API_URL}${calculationId}`, config);
	return response.data;
};

// Update a users calculation
const updateCalculation = async (calculationId, calculationData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(`${API_URL}${calculationId}`, calculationData, config);
	return response.data;
};

// Update a users calculation name
const renameCalculation = async (calculationId, calculationData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(`${API_URL}${calculationId}`, calculationData, config);

	return response.data;
};

const deleteCalculation = async (calculationId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(`${API_URL}${calculationId}`, config);
	return response.data;
};

const annualizedReturnCalculatorService = {
	getCalculations,
	getCalculation,
	deleteCalculation,
	createCalculation,
	updateCalculation,
	renameCalculation,
};

export default annualizedReturnCalculatorService;
