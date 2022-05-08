import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUser, FaSun, FaMoon, FaCaretDown } from 'react-icons/fa';

const NavLinks = ({
	user,
	darkMode,
	setListOpen,
	listOpen,
	handleDarkModeChange,
	burgerActive,
}) => {
	return (
		<ul className={`nav-links ${burgerActive ? 'active' : ''}`}>
			<li>
				<a className="nav-icon" onClick={() => handleDarkModeChange()}>
					{darkMode ? (
						<>
							<FaSun /> <span className="darkmode-toggler-mobile">Lightmode</span>
						</>
					) : (
						<>
							<FaMoon />
							<span className="darkmode-toggler-mobile">Darkmode</span>
						</>
					)}
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
					<li
						className={`user-options-toggler ${listOpen ? 'active' : ''} `}
						onClick={() => setListOpen(!listOpen)}
					>
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
