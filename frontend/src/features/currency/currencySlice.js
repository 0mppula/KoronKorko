import { createSlice } from '@reduxjs/toolkit';
import { currencies } from '../../assets/data';

let currency;
try {
	currency = JSON.parse(localStorage.getItem('currency')) || currencies[0];
} catch (error) {
	currency = currencies[0];
}

const currencySlice = createSlice({
	name: 'currency',
	initialState: { currency },
	reducers: {
		setCurrency: (state, action) => {
			state.currency = action.payload;
		},
	},
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
