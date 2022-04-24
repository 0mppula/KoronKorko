import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from '../src/pages/Dashboard';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import CompoundInterestCalculator from './pages/CompoundInterestCalculator';

function App() {
	return (
		<>
			<Router>
				<Nav />
				<div className="container">
					<Routes>
						<Route path="/" element={<CompoundInterestCalculator />} />
						<Route path="/plans" element={<Dashboard />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Routes>
				</div>
				<Footer />
			</Router>
			<ToastContainer  />
		</>
	);
}

export default App;
