import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUser, FaSun, FaMoon, FaCaretDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import checkKeyDown from '../../helpers/checkKeyDown';

const NavLinks = ({
	user,
	setListOpen,
	listOpen,
	handleDarkModeChange,
	burgerActive,
	setBurgerActive,
	navLinksRef,
	listRef,
}) => {
	const { darkMode } = useSelector((state) => state.theme);

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
				<button
					className={`nav-icon ${burgerActive ? 'active' : ''}`}
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
				</button>
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
						aria-expanded={listOpen}
					>
						<button className="btn-block">
							{user.username} <FaCaretDown />
						</button>
					</li>
				</>
			)}
		</ul>
	);
};

export default NavLinks;
