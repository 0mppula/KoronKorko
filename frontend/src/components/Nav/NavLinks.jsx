import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUser, FaSun, FaMoon, FaCaretDown } from 'react-icons/fa';

import checkKeyDown from '../../helpers/checkKeyDown';

const NavLinks = ({
	user,
	darkMode,
	setListOpen,
	listOpen,
	handleDarkModeChange,
	burgerActive,
	setBurgerActive,
	navLinksRef,
	listRef,
}) => {
	useEffect(() => {
		let handler = (e) => {
			if (
				!navLinksRef.current.contains(e.target) &&
				!listRef.current.contains(e.target) &&
				burgerActive
			) {
				setBurgerActive(false);
			}
		};

		document.addEventListener('click', handler);

		return () => {
			document.removeEventListener('click', handler);
		};
	});

	const loginLinkRef = useRef();
	const registerLinkRef = useRef();

	return (
		<ul className={`nav-links ${burgerActive ? 'active' : ''}`} ref={navLinksRef}>
			<li>
				<a
					tabIndex={0}
					className="nav-icon"
					onClick={() => handleDarkModeChange()}
					onKeyDown={(e) => checkKeyDown(e, handleDarkModeChange)}
					title={`${darkMode ? 'Switch to light mode' : 'Switch to dark mode'}`}
				>
					{darkMode ? (
						<>
							<span className="darkmode-toggler-mobile">Lightmode</span>
							<FaSun />
						</>
					) : (
						<>
							<span className="darkmode-toggler-mobile">Darkmode</span>
							<FaMoon />
						</>
					)}
				</a>
			</li>
			{/* No user */}
			{!user ? (
				<>
					<li
						tabIndex={0}
						onKeyDown={(e) => checkKeyDown(e, () => loginLinkRef.current.click())}
					>
						<Link to="/login" tabIndex={-1} ref={loginLinkRef}>
							Login
							<FaSignInAlt />
						</Link>
					</li>
					<li
						tabIndex={0}
						onKeyDown={(e) => checkKeyDown(e, () => registerLinkRef.current.click())}
					>
						<Link to="/register" tabIndex={-1} ref={registerLinkRef}>
							Register <FaUser />
						</Link>
					</li>
				</>
			) : (
				<>
					<li
						tabIndex={0}
						className={`user-options-toggler ${listOpen ? 'active' : ''} `}
						onClick={() => setListOpen(!listOpen)}
						onKeyDown={(e) => checkKeyDown(e, () => setListOpen(!listOpen))}
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
