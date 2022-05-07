import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from '../src/pages/Dashboard/Dashboard';
import Login from '../src/pages/Login/Login';
import Register from '../src/pages/Register/Register';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import ScrollToTop from './components/Tools/ScrollToTop';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator/CompoundInterestCalculator';
import ToastCloseButton from './components/Tools/ToastCloseButton';

function App() {
	const { user } = useSelector((state) => state.auth);
	const [darkMode, setDarkMode] = useState(
		JSON.parse(localStorage.getItem('darkMode')) ||
			(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
	);

	useEffect(() => {
		if (user) {
			setDarkMode(user?.preferences.darkMode);
		} else {
			setDarkMode(localStorage.getItem('darkMode'))
		}
	}, [user]);

	useEffect(() => {
		let body = document.body;
		if (!user) {
			localStorage.setItem('darkmode', darkMode);
		}
		darkMode === true ? body.classList.add('darkmode') : body.classList.remove('darkmode');
	}, [darkMode]);

	return (
		<>
			<Router>
				<ScrollToTop />/
				<Nav darkMode={darkMode} setDarkMode={setDarkMode} />
				<div className="container">
					<Routes>
						<Route path="/" element={<CompoundInterestCalculator />} />
						<Route path="/plans" element={<Dashboard />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</div>
				<Footer />
			</Router>
			<ToastContainer closeButton={<ToastCloseButton />} />
		</>
	);
}

export default App;
