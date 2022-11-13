import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RedirectFromRoot = () => {
	const { pathname } = useLocation();
	const url = window.location.href;

	useEffect(() => {
		// If in root url redirect to www.koronkorko.com
		const devUrl = window.location.href === 'http://localhost:3000/';
		const herokuUrl = window.location.href === 'https://koronkorko.herokuapp.com/';
		const suffix = window.location.href.split(/\//);

		if (!String(url).match(/\/\/www./) && !devUrl && !herokuUrl) {
			window.location.href = `http://www.koronkorko.com/${suffix}`;
		}
	}, [pathname, url]);

	return null;
};

export default RedirectFromRoot;
