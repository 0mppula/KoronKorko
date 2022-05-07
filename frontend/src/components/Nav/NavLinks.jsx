import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUser, FaSun, FaMoon, FaCaretDown } from 'react-icons/fa';

const NavLinks = ({ user, darkMode, setListOpen, listOpen, handleDarkModeChange }) => {
	return (
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
					<li className="user-options-toggler" onClick={() => setListOpen(!listOpen)}>
						<a>
							{user.username} <FaCaretDown />
						</a>
					</li>
				</>
			)}
		</ul>
	);
};

export default NavLinks;
