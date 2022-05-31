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

// Get a users calculation
export const getCalculation = createAsyncThunk(
	'compound-interest-calculations/get-one',
	async (calculationId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await compoundInterestCalculatorService.getCalculation(calculationId, token);
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
			return await compoundInterestCalculatorService.updateCalculation(
				calculationData._id,
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
	'compound-interest-calculations/delete-one',
	async (calculationId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await compoundInterestCalculatorService.deleteCalculation(calculationId, token);
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
		reset: () => initialState,
	},
	extraReducers: (builder) => {
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
				state.message = 'New Plan Created';
				state.isError = false;
			})
			.addCase(createCalculation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// End Create calculation
			// Get users calculations
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
			// End Get users calculations
			// Get a users calculation
			.addCase(getCalculation.pending, (state) => {
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
			// End Get a users calculation
			// Update users calculations
			.addCase(updateCalculation.pending, (state) => {
				state.message = '';
				state.isLoading = true;
			})
			.addCase(updateCalculation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.activeCalculation = action.payload;
				state.message = 'Plan Saved';
				state.isError = false;
			})
			.addCase(updateCalculation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// End Update users calculations
			// Update a users calculation name
			.addCase(renameCalculation.pending, (state) => {
				state.message = '';
				state.isLoading = true;
			})
			.addCase(renameCalculation.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.activeCalculation = action.payload;
				state.message = 'Plan Renamed';
				state.isError = false;
			})
			.addCase(renameCalculation.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// End Update a users calculation name
			// Delete a users calculation
			.addCase(deleteCalculation.pending, (state) => {
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
		// End Delete a users calculation
	},
});

export const { reset } = compoundInterestCalculatorSlice.actions;
export default compoundInterestCalculatorSlice.reducer;
