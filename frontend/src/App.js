import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from '../src/pages/Dashboard';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Nav from './components/Nav';

function App() {
	return (
		<>
			<Router>
				<div className="container">
					<Nav />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
