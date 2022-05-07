import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaSun, FaMoon } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserPreferences } from '../../features/auth/authSlice';

import { reset, logout } from '../../features/auth/authSlice';
import './styles.css';

const Nav = ({ darkMode, setDarkMode }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const handleLogout = () => {
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
			<ul className="nav-links">
				<li>
					<a className="nav-icon" onClick={() => handleDarkModeChange()}>
						{darkMode ? <FaSun /> : <FaMoon />}
					</a>
				</li>
				{/* No user */}
				{!user ? (
					<>
						<li>
							<Link to="/login">
								<FaSignInAlt />
								Login
							</Link>
						</li>
						<li>
							<Link to="/register">
								<FaUser /> Register
							</Link>
						</li>
					</>
				) : (
					<>
						<li>{user.username}</li>
						<li onClick={handleLogout}>
							<a>
								<FaSignOutAlt /> Logout
							</a>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Nav;
