import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Nav = () => {
	return (
		<nav className="header">
			<div className="logo">
				<Link to="/">Home</Link>
			</div>
			<ul>
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
			</ul>
		</nav>
	);
};

export default Nav;
