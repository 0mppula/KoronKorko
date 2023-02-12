import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import compoundInterestCalculatorReducer from '../features/compoundInterestCalculator/compoundInterestCalculatorSlice';
import annualizedReturnCalculatorReducer from '../features/annualizedReturnCalculator/annualizedReturnCalculatorSlice';
import presentValueCalculatorReducer from '../features/presentValueCalculator/presentValueCalculatorSlice';
import themeReducer from '../features/theme/themeSlice';
import currencyReducer from '../features/currency/currencySlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		compoundInterestCalculations: compoundInterestCalculatorReducer,
		annualizedReturnCalculations: annualizedReturnCalculatorReducer,
		presentValueCalculations: presentValueCalculatorReducer,
		theme: themeReducer,
		currency: currencyReducer,
	},
});
