import React, { useEffect, useRef } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import checkKeyDown from '../../helpers/checkKeyDown';

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
			<li tabIndex={0}>Prefereces</li>
			<li tabIndex={0}>Plans</li>
			<li className="seperator" />
			<li
				onClick={handleLogout}
				tabIndex={0}
				onKeyDown={(e) => checkKeyDown(e, handleLogout)}
			>
				Logout <FaSignOutAlt />
			</li>
		</ul>
	);
};

export default UserOptionsList;
