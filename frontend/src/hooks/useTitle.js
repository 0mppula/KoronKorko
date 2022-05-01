import { useEffect } from 'react';

/* Hook for changing the title */
export const useTitle = (title) => {
	useEffect(() => {
		const defaultTitle = document.title;
    const appTitle = 'KoronKorko'
		title && (document.title = `${title} - ${appTitle}`);
		// following line is optional, but will reset title when component unmounts
		return () => (document.title = defaultTitle);
	}, [title]);
};
