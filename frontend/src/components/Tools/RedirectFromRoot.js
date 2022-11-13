import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RedirectFromRoot = () => {
	const { pathname } = useLocation();
	const url = window.location.href;

	useEffect(() => {
		const devUrl = window.location.href?.startsWith('http://localhost:3000/');
		const herokuUrl = window.location.href?.startsWith('https://koronkorko.herokuapp.com/');
		const suffix = window.location.href.split(/.com\//);
		const rootUrl = !window.location.href.match(/\/\/www./);

		// If in root url & not in local or in herokuapp set "www" as url host and redirect.
		if (rootUrl && !devUrl && !herokuUrl) {
			window.location.href = `http://www.koronkorko.com/${suffix[suffix.length - 1]}`;
		}
	}, [pathname, url]);

	return null;
};

export default RedirectFromRoot;
