import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import compoundInterestCalculatorReducer from '../features/compoundInterestCalculator/compoundInterestCalculatorSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		compoundInterestCalculations: compoundInterestCalculatorReducer,
	},
});
