import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import annualizedReturnCalculatorService from './annualizedReturnCalculatorService';

const initialState = {
	calculations: [],
	activeCalculation: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get users calculations
export const getCalculations = createAsyncThunk(
	'annualized-return-calculations/get-all',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await annualizedReturnCalculatorService.getCalculations(token);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.mesage ||
				error.toString();
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
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.mesage ||
				error.toString();
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
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.mesage ||
				error.toString();
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
				state.message = action.payload;
			});
	},
});

export const { reset, closeCalculation } = annualizedReturnCalculatorSlice.actions;
export default annualizedReturnCalculatorSlice.reducer;
