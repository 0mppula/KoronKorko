import { useEffect, useState } from 'react';

/* Getting the current width of the browser window */
export const useWindowWidth = () => {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

    // Clean up
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return width;
};