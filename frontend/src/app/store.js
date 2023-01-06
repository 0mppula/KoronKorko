import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import compoundInterestCalculatorReducer from '../features/compoundInterestCalculator/compoundInterestCalculatorSlice';
import annualizedReturnCalculatorReducer from '../features/AnnualizedReturnCalculator/annualizedReturnCalculatorSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		compoundInterestCalculations: compoundInterestCalculatorReducer,
		annualizedReturnCalculations: annualizedReturnCalculatorReducer,
		theme: themeReducer,
	},
});
