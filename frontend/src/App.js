import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setDarkMode } from './features/theme/themeSlice';
import Login from '../src/pages/Login/Login';
import Register from '../src/pages/Register/Register';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import ScrollToTop from './components/Tools/ScrollToTop';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator/CompoundInterestCalculator';
import ToastCloseButton from './components/Tools/ToastCloseButton';
import ToTop from './components/Tools/ToTop';

function App() {
	const { user } = useSelector((state) => state.auth);
	const { darkMode } = useSelector((state) => state.theme);
	const dispatch = useDispatch();
	const [updates, setUpdates] = useState(0);

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
						<Route
							path="/compound-interest-calculator"
							element={<CompoundInterestCalculator />}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						{/* Fall back url is the compound interest calculator page */}
						<Route
							path="*"
							element={<Navigate replace to="/compound-interest-calculator" />}
						/>
					</Routes>
				</div>
				<Footer />
			</Router>
			<ToTop />
			<ToastContainer
				autoClose={3000}
				pauseOnFocusLoss={false}
				closeButton={<ToastCloseButton />}
			/>
		</>
	);
}

export default App;
