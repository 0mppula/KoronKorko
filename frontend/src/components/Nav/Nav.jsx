import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserPreferences } from '../../features/auth/authSlice';

import { reset, logout } from '../../features/auth/authSlice';
import UserOptionsList from './UserOptionsList';
import './styles.css';
import NavLinks from './NavLinks';

const Nav = ({ darkMode, setDarkMode }) => {
	const [listOpen, setListOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const handleLogout = () => {
		setListOpen(false);
		dispatch(logout());
		dispatch(reset());
		navigate('/login');
	};

	const handleDarkModeChange = () => {
		const mode = !darkMode;
		user && dispatch(updateUserPreferences({ ...user.preferences, darkMode: mode }));
		!user && setDarkMode(mode);
	};

	return (
		<nav className="navbar">
			<div className="logo">
				<Link to="/">
					<h1>
						<span>K</span>oron<span>K</span>orko
					</h1>
				</Link>
			</div>
			<NavLinks
				user={user}
				darkMode={darkMode}
				listOpen={listOpen}
				setListOpen={setListOpen}
				handleDarkModeChange={handleDarkModeChange}
			/>
			<UserOptionsList
				handleLogout={handleLogout}
				listOpen={listOpen}
				setListOpen={setListOpen}
			/>
		</nav>
	);
};

export default Nav;
