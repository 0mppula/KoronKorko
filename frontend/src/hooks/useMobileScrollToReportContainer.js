import { useEffect, useState } from 'react';
import { useWindowWidth } from './useWindowWidth';

export const useMobileScrollToReportContainer = (calculationCount) => {
	// Hook for scrolling on mobile screens to the report element of a calculation after the
	// calculators "calculate" button is presed.
	const [scrolled, setScrolled] = useState(false);

	const windowWidth = useWindowWidth();

	useEffect(() => {
		// Set scrolled flag to false only after the forms "calculate" button is pressed to avoid
		// unwanted scrolls on the window resize.
		setScrolled(false);
	}, [calculationCount]);

	useEffect(() => {
		const reportSummary = document.querySelector('.report-container');

		if (windowWidth <= 576 && reportSummary && !scrolled) {
			window.scrollTo({
				top: reportSummary.offsetTop - 60,
				left: 0,
				behavior: 'smooth',
			});

			setScrolled(true);
		}
	}, [scrolled, windowWidth]);
};
