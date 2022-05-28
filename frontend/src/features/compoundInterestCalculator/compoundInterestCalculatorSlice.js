import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import compoundInterestCalculatorService from './compoundInterestCalculatorService';

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
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.mesage ||
				error.toString();
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
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.mesage ||
				error.toString();
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
			console.log('token', token);
			console.log(calculationData);
			return await compoundInterestCalculatorService.updateCalculation(
				calculationData,
				token
			);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.mesage ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const compoundInterestCalculatorSlice = createSlice({
	name: 'compoundInterestCalculator',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Create calculation
			.addCase(createCalculation.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCalculation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.calculations.push(action.payload);
				state.activeCalculation = action.payload;
			})
			.addCase(createCalculation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// End Create calculation
			// Get users calculations
			.addCase(getCalculations.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCalculations.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.calculations = action.payload;
			})
			.addCase(getCalculations.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// End Get users calculations
			// Update users calculations
			.addCase(updateCalculation.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCalculation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.calculations = action.payload;
			})
			.addCase(updateCalculation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
		// End Update users calculations
	},
});

export const { reset } = compoundInterestCalculatorSlice.actions;
export default compoundInterestCalculatorSlice.reducer;
