import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import { reset, logout } from '../features/auth/authSlice';

const Nav = () => {
	const dispatch = useDispatch();
	const naviagate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const handleLogout = () => {
		console.log('logout');
		dispatch(logout());
		dispatch(reset());
		naviagate('/');
	};

	return (
		<nav className="header">
			<div className="logo">
				<Link to="/">Home</Link>
			</div>
			<ul>
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
						<li>
							<button className="btn" onClick={handleLogout}>
								<FaSignOutAlt /> Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Nav;
