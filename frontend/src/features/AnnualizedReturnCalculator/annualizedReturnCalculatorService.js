import axios from 'axios';

const API_URL = '/api/annualized-return-calculations/';

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
};

export default annualizedReturnCalculatorService;
