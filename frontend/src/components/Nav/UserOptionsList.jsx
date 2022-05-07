import React, { useEffect, useRef } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const UserOptionsList = ({ handleLogout, listOpen, setListOpen }) => {
	useEffect(() => {
		let handler = (e) => {
			if (!listRef.current.contains(e.target) && listOpen) {
				setListOpen(false);
			}
		};

		document.addEventListener('click', handler);

		return () => {
			document.removeEventListener('click', handler);
		};
	});

	const listRef = useRef();
	return (
		<ul className={`user-options ${listOpen ? 'show' : ''}`} ref={listRef}>
			<li>Prefereces</li>
			<li>Plans</li>
			<li className="seperator"></li>
			<li onClick={handleLogout}>
				<FaSignOutAlt /> Logout
			</li>
		</ul>
	);
};

export default UserOptionsList;
