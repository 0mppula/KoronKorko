import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from '../src/pages/Dashboard/Dashboard';
import Login from '../src/pages/Login/Login';
import Register from '../src/pages/Register/Register';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import ScrollToTop from './components/Tools/ScrollToTop';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator/CompoundInterestCalculator';

function App() {
	return (
		<>
			<Router>
				<ScrollToTop />/
				<Nav />
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
			<ToastContainer />
		</>
	);
}

export default App;
