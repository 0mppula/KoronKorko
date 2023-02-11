import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getErrorMessage from '../utils/getErrorMessage';
import annualizedReturnCalculatorService from './annualizedReturnCalculatorService';

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
		// Get users calculations
		builder
			// Create calculation
			.addCase(createCalculation.pending, (state) => {
				state.message = '';
				state.isLoading = true;
			})
			.addCase(createCalculation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.calculations.push(action.payload);
				state.activeCalculation = action.payload;
				state.message = 'New calculation created';
				state.isError = false;
			})
			.addCase(createCalculation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			})
			.addCase(getCalculations.pending, (state) => {
				state.message = '';
				state.isLoading = true;
			})
			.addCase(getCalculations.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.calculations = action.payload;
				state.isError = false;
			})
			.addCase(getCalculations.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			})
			// Get a users calculation
			.addCase(getCalculation.pending, (state, action) => {
				state.message = '';
				state.isLoading = true;
			})
			.addCase(getCalculation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.activeCalculation = action.payload;
				state.message = `${action.payload.name} imported`;
				state.isError = false;
			})
			.addCase(getCalculation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			})
			// Update users calculations
			.addCase(updateCalculation.pending, (state) => {
				state.message = '';
				state.isLoading = true;
			})
			.addCase(updateCalculation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.activeCalculation = action.payload;
				state.message = 'Calculation Saved';
				state.isError = false;
			})
			.addCase(updateCalculation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			})
			// Update a users calculation name
			.addCase(renameCalculation.pending, (state) => {
				state.message = '';
				state.isLoading = true;
			})
			.addCase(renameCalculation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.activeCalculation = action.payload;
				state.message = 'Calculation Renamed';
				state.isError = false;
			})
			.addCase(renameCalculation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			})
			// Delete a users calculation
			.addCase(deleteCalculation.pending, (state, action) => {
				state.message = '';
				state.isLoading = true;
			})
			.addCase(deleteCalculation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.calculations = state.calculations.filter(
					(calculation) => calculation._id !== action.payload.id
				);
				state.activeCalculation =
					action.payload.id === state.activeCalculation?._id
						? null
						: state.activeCalculation;
				state.message = `${action.payload.name} deleted`;
				state.isError = false;
			})
			.addCase(deleteCalculation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			});
	},
});

export const { reset, closeCalculation } = annualizedReturnCalculatorSlice.actions;
export default annualizedReturnCalculatorSlice.reducer;
