import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localstorage
let user;
try {
	user = JSON.parse(localStorage.getItem('user'));
} catch (error) {
	user = null;
}

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Get user data
export const getUserData = createAsyncThunk('auth/me', async (_, thunkAPI) => {
	try {
		const user = thunkAPI.getState().auth.user;
		return await authService.getUserData(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Register user
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
	try {
		return await authService.register(userData);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Login usser
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
	try {
		return await authService.login(userData);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

// Update users preferences
export const updateUserPreferences = createAsyncThunk(
	'auth/update/preferences',
	async (userData, thunkAPI) => {
		try {
			const user = thunkAPI.getState().auth.user;
			return await authService.updateUserPreferences(user, userData);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			// Get user data
			.addCase(getUserData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(getUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				// state.user = null;
			})
			// Register
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			// Login
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			// Logout
			.addCase(logout.pending, (state) => {
				state.user = null;
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.isLoading = false;
			})
			// Update currency
			.addCase(updateUserPreferences.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(updateUserPreferences.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.user = { ...state.user, preferences: action.payload };
				state.isLoading = false;
			})
			.addCase(updateUserPreferences.rejected, (state, action) => {
				state.isLoading = false;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
