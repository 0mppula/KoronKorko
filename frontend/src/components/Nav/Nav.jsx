import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserPreferences } from '../../features/auth/authSlice';

import { reset, logout } from '../../features/auth/authSlice';
import { reset as resetCompoundInterestCalculations } from '../../features/compoundInterestCalculator/compoundInterestCalculatorSlice';
import UserOptionsList from './UserOptionsList';
import './styles.css';
import NavLinks from './NavLinks';
import Burger from './Burger';
import logo_dark from '../../assets/images/logo_dark.png';
import logo_light from '../../assets/images/logo_light.png';

const Nav = ({ darkMode, setDarkMode }) => {
	const [listOpen, setListOpen] = useState(false);
	const [burgerActive, setBurgerActive] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useSelector((state) => state.auth);
	const listRef = useRef();
	const navLinksRef = useRef();

	const handleLogout = () => {
		setListOpen(false);
		dispatch(logout());
		dispatch(reset());
		dispatch(resetCompoundInterestCalculations());
		navigate('/login');
	};

	const handleDarkModeChange = () => {
		const mode = !darkMode;
		user && dispatch(updateUserPreferences({ ...user.preferences, darkMode: mode }));
		!user && setDarkMode(mode);
	};

	const handleBurgerClick = () => {
		setBurgerActive(!burgerActive);
	};

	useEffect(() => {
		setBurgerActive(false);
	}, [darkMode, location]);

	return (
		<nav className="navbar">
			<div className="logo">
				<Link to="/">
					<img src={darkMode ? logo_dark : logo_light} alt="logo.jpg" />
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
				burgerActive={burgerActive}
				setBurgerActive={setBurgerActive}
				navLinksRef={navLinksRef}
				listRef={listRef}
			/>
			<UserOptionsList
				handleLogout={handleLogout}
				listOpen={listOpen}
				setListOpen={setListOpen}
				listRef={listRef}
			/>
			<Burger handleBurgerClick={handleBurgerClick} burgerActive={burgerActive} />
		</nav>
	);
};

export default Nav;
