import React, { useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import checkKeyDown from '../../helpers/checkKeyDown';

const UserOptionsList = ({ handleLogout, listOpen, setListOpen, listRef }) => {
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

	return (
		<ul role="menu" className={`user-options ${listOpen ? 'show' : ''}`} ref={listRef}>
			<li role="menuitem" tabIndex={`${listOpen ? 0 : -1}`}>
				Prefereces
			</li>
			<li className="seperator" aria-hidden />
			<li
				role="menuitem"
				onClick={handleLogout}
				tabIndex={`${listOpen ? 0 : -1}`}
				onKeyDown={(e) => checkKeyDown(e, handleLogout)}
			>
				Logout <FaSignOutAlt />
			</li>
		</ul>
	);
};

export default UserOptionsList;
