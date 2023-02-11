import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getErrorMessage from '../utils/getErrorMessage';
import compoundInterestCalculatorService from './compoundInterestCalculatorService';
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
	'compound-interest-calculations/create',
	async (calculationData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await compoundInterestCalculatorService.createCalculation(
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
	'compound-interest-calculations/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await compoundInterestCalculatorService.getCalculations(token);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get a users calculation
export const getCalculation = createAsyncThunk(
	'compound-interest-calculations/get-one',
	async (calculationId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await compoundInterestCalculatorService.getCalculation(calculationId, token);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Update a users calculation
export const updateCalculation = createAsyncThunk(
	'compound-interest-calculations/update',
	async (calculationData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await compoundInterestCalculatorService.updateCalculation(
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
	'compound-interest-calculations/rename',
	async (calculationData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await compoundInterestCalculatorService.renameCalculation(
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

// Delete a users calculation
export const deleteCalculation = createAsyncThunk(
	'compound-interest-calculations/delete-one',
	async (calculationId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await compoundInterestCalculatorService.deleteCalculation(calculationId, token);
		} catch (error) {
			const message = getErrorMessage(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const compoundInterestCalculatorSlice = createSlice({
	name: 'compoundInterestCalculator',
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

export const { reset, closeCalculation } = compoundInterestCalculatorSlice.actions;
export default compoundInterestCalculatorSlice.reducer;
