import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserPreferences } from '../../features/auth/authSlice';

import { reset, logout } from '../../features/auth/authSlice';
import { reset as resetCompoundInterestCalculations } from '../../features/compoundInterestCalculator/compoundInterestCalculatorSlice';
import UserOptionsList from './UserOptionsList';
import './styles.css';
import NavLinks from './NavLinks';
import Burger from './Burger';

const Nav = ({ darkMode, setDarkMode }) => {
	const [listOpen, setListOpen] = useState(false);
	const [burgerActive, setBurgerActive] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

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
	}, [darkMode]);

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
				burgerActive={burgerActive}
			/>
			<UserOptionsList
				handleLogout={handleLogout}
				listOpen={listOpen}
				setListOpen={setListOpen}
			/>
			<Burger handleBurgerClick={handleBurgerClick} burgerActive={burgerActive} />
		</nav>
	);
};

export default Nav;
