import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getErrorMessage from '../utils/getErrorMessage';
import calculatorService from '../utils/calculatorService';
import {
	addCreateCalculationCase,
	addDeleteCalculationCase,
	addGetCalculationCase,
	addGetCalculationsCase,
	addRenameCalculationCase,
	addUpdateCalculationCase,
} from '../utils/calculatorExtraReducerCases';

const initialState = {
	calculations: [],
	activeCalculation: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

const API_URL = '/api/investment-time-calculations/';
const API_URL_NAME = 'investment-time-calculations';

// Create new calculation
export const createCalculation = createAsyncThunk(
	`${API_URL_NAME}/create`,
	async (calculationData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await calculatorService.createCalculation(API_URL, calculationData, token);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get users calculations
export const getCalculations = createAsyncThunk(`${API_URL_NAME}/get-all`, async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await calculatorService.getCalculations(API_URL, token);
	} catch (error) {
		const message = getErrorMessage(error);
		return thunkAPI.rejectWithValue(message);
	}
});

// Update a users calculation
export const updateCalculation = createAsyncThunk(
	`${API_URL_NAME}/update`,
	async (calculationData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await calculatorService.updateCalculation(
				API_URL,
				calculationData._id,
				calculationData,
				token
			);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Update a users calculation name
export const renameCalculation = createAsyncThunk(
	`${API_URL_NAME}/rename`,
	async (calculationData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await calculatorService.renameCalculation(
				API_URL,
				calculationData._id,
				calculationData,
				token
			);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get a users calculation
export const getCalculation = createAsyncThunk(
	`${API_URL_NAME}/get-one`,
	async (calculationId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await calculatorService.getCalculation(API_URL, calculationId, token);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Delete a users calculation
export const deleteCalculation = createAsyncThunk(
	`${API_URL_NAME}/delete-one`,
	async (calculationId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await calculatorService.deleteCalculation(API_URL, calculationId, token);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const investmentTimeCalculatorSlice = createSlice({
	name: 'investmentTimeCalculatorSlice',
	initialState,
	reducers: {
		reset: () => initialState,
		// Close a users calculation
		closeCalculation: (state) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.activeCalculation = null;
			state.message = 'Calculation closed';
			state.isError = false;
		},
	},
	extraReducers: (builder) => {
		addCreateCalculationCase(builder, createCalculation);
		addGetCalculationsCase(builder, getCalculations);
		addGetCalculationCase(builder, getCalculation);
		addUpdateCalculationCase(builder, updateCalculation);
		addRenameCalculationCase(builder, renameCalculation);
		addDeleteCalculationCase(builder, deleteCalculation);
	},
});

export const { reset, closeCalculation } = investmentTimeCalculatorSlice.actions;
export default investmentTimeCalculatorSlice.reducer;
