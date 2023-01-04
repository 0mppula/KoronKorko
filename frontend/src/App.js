import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setDarkMode } from './features/theme/themeSlice';
import { getUserData } from './features/auth/authSlice';
import Login from '../src/pages/Login/Login';
import Register from '../src/pages/Register/Register';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import ScrollToTop from './components/Tools/ScrollToTop';
import ToastCloseButton from './components/Tools/ToastCloseButton';
import ToTop from './components/Tools/ToTop';
import Home from './pages/Home/Home';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator/CompoundInterestCalculator';
import AnnualizedReturnCalculator from './pages/AnnualizedReturnCalculator/AnnualizedReturnCalculator';
import PresentValueCalculator from './pages/PresentValueCalculator/PresentValueCalculator';
import InvestmentTimeCalculator from './pages/InvestmentTimeCalculator/InvestmentTimeCalculator';
import BreakEvenPointCalculator from './pages/BreakEvenPointCalculator/BreakEvenPointCalculator';
import MarkupCalculator from './pages/MarkupCalculator/MarkupCalculator';

function App() {
	const { user } = useSelector((state) => state.auth);
	const { darkMode } = useSelector((state) => state.theme);
	const dispatch = useDispatch();
	const [updates, setUpdates] = useState(0);
	const [userLoaded, setUserLoaded] = useState(false);

	useEffect(() => {
		// On app init load user data
		if (user?.token && !userLoaded) {
			dispatch(getUserData());
			setUserLoaded(true);
		}
	}, [user, userLoaded, dispatch]);

	useEffect(() => {
		if (user) {
			// When user is logged in set darkmode to value from user preferences
			dispatch(setDarkMode(user?.preferences.darkMode));
		} else {
			// When user is not logged in set darkmode to value from local storage
			dispatch(setDarkMode(JSON.parse(localStorage.getItem('darkMode'))));
		}
	}, [user]);

	useEffect(() => {
		let body = document.body;
		if (!user) {
			// When user is not logged update the local storage value for darkmode
			localStorage.setItem('darkMode', darkMode);
		}
		darkMode === true ? body.classList.add('darkmode') : body.classList.remove('darkmode');
		setUpdates(updates + 1);
	}, [darkMode]);

	return (
		<>
			<Router>
				<ScrollToTop />

				<Nav />
				<div className="container">
					<Routes>
						{/* Calculators */}
						<Route
							path="/compound-interest-calculator"
							element={<CompoundInterestCalculator />}
						/>
						<Route
							path="/annualized-return-calculator"
							element={<AnnualizedReturnCalculator />}
						/>
						<Route
							path="/present-value-calculator"
							element={<PresentValueCalculator />}
						/>
						<Route
							path="/investment-time-calculator"
							element={<InvestmentTimeCalculator />}
						/>
						<Route
							path="/break-even-point-calculator"
							element={<BreakEvenPointCalculator />}
						/>
						<Route path="/markup-calculator" element={<MarkupCalculator />} />
						{/* End Calculators */}

						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						{/* Fall back url is the compound interest calculator page */}
						<Route path="*" element={<Navigate replace to="/" />} />
					</Routes>
				</div>
				<Footer />
			</Router>
			
			<ToTop />
			<ToastContainer
				limit={5}
				autoClose={3000}
				pauseOnFocusLoss={false}
				closeButton={<ToastCloseButton />}
			/>
		</>
	);
}

export default App;
