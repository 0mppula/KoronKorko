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
	'annualized-return-calculations/getAll',
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
			});
	},
});

export const { reset, closeCalculation } = annualizedReturnCalculatorSlice.actions;
export default annualizedReturnCalculatorSlice.reducer;
