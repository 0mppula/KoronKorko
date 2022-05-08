import React from 'react';

const Burger = ({ handleBurgerClick, burgerActive }) => {
	return (
		<div
			className={`burger-container ${burgerActive ? 'active' : ''} `}
			onClick={handleBurgerClick}
		>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Burger;
