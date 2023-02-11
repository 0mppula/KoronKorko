import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getErrorMessage from '../utils/getErrorMessage';
import annualizedReturnCalculatorService from './annualizedReturnCalculatorService';
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

// Create new calculation
export const createCalculation = createAsyncThunk(
	'annualized-return-calculations/create',
	async (calculationData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await annualizedReturnCalculatorService.createCalculation(
				calculationData,
				token
			);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get users calculations
export const getCalculations = createAsyncThunk(
	'annualized-return-calculations/get-all',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await annualizedReturnCalculatorService.getCalculations(token);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Update a users calculation
export const updateCalculation = createAsyncThunk(
	'annualized-return-calculations/update',
	async (calculationData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await annualizedReturnCalculatorService.updateCalculation(
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
	'annualized-return-calculations/rename',
	async (calculationData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await annualizedReturnCalculatorService.renameCalculation(
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
	'annualized-return-calculations/get-one',
	async (calculationId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await annualizedReturnCalculatorService.getCalculation(calculationId, token);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Delete a users calculation
export const deleteCalculation = createAsyncThunk(
	'annualized-return-calculations/delete-one',
	async (calculationId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await annualizedReturnCalculatorService.deleteCalculation(calculationId, token);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const annualizedReturnCalculatorSlice = createSlice({
	name: 'annualizedReturnCalculator',
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

export const { reset, closeCalculation } = annualizedReturnCalculatorSlice.actions;
export default annualizedReturnCalculatorSlice.reducer;
