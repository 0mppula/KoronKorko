import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RedirectFromRoot = () => {
	const { pathname } = useLocation();
	const url = window.location.href;

	useEffect(() => {
		// If in root url redirect to www.koronkorko.com
		const devUrl = window.location.href?.startsWith('http://localhost:3000/');
		const herokuUrl = window.location.href?.startsWith('https://koronkorko.herokuapp.com/');
		const suffix = window.location.href.split(/.com\//);

		if (!String(url).match(/\/\/www./) && !devUrl && !herokuUrl) {
			window.location.href = `http://www.koronkorko.com/${suffix[suffix.length - 1]}`;
		}
	}, [pathname, url]);

	return null;
};

export default RedirectFromRoot;
