import React, { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

import checkKeyDown from '../../helpers/checkKeyDown';
import './styles.css';

const ToTop = () => {
	const [active, setActive] = useState(false);

	window.addEventListener('scroll', () => {
		// Limit in y-axis pixels when to show scroll to top element
		const SCROLL_LIMIT = 200;

		let pageY = window.pageYOffset;
		pageY > SCROLL_LIMIT && setActive(true);
		pageY < SCROLL_LIMIT && setActive(false);
	});

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div
			tabIndex={active ? 0 : -1}
			onClick={scrollToTop}
			onKeyDown={(e) => checkKeyDown(e, scrollToTop)}
			className={`to-top-button ${active ? 'active' : ''}`}
		>
			<FaChevronUp />
		</div>
	);
};

export default ToTop;
