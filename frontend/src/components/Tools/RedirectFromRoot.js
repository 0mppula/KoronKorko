import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RedirectFromRoot = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const url = window.location.href;

	useEffect(() => {
		// If in root url redirect to www.koronkorko.com
		if (!String(url).match(/\/\/www./)) {
			window.location.href = 'http://www.koronkorko.com/';
		}
	}, [pathname, url]);

	return null;
};

export default RedirectFromRoot;
