import { createSlice } from '@reduxjs/toolkit';

// Get user from localstorage
let darkMode;
try {
	darkMode =
		JSON.parse(localStorage.getItem('darkMode')) ||
		(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
} catch (error) {
	darkMode =
		(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || false;
}

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		darkMode,
	},
	reducers: {
		setDarkMode: (state, action) => {
			state.darkMode = action.payload;
		},
	},
});

export const { setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
