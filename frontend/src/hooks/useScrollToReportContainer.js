import { useEffect } from 'react';
import { useWindowWidth } from './useWindowWidth';

/**
 *
 * If the top of the report summary container is not sufficiantly visible or the app is viewed with
 * a mobile device, this hook will scroll to the top of the report summary container.
 * @param {number} calculationCount The count of the number of calculations made. Every calculation
 * button click should increments this variable.
 */
export const useScrollToReportContainer = (calculationCount) => {
	const windowWidth = useWindowWidth();

	useEffect(() => {
		const reportSummary = document.querySelector('.report-container');
		const reportSummaryDimensions = reportSummary.getBoundingClientRect();
		// Atleast 60px should be visible from the top of the element.
		const topOfReportSummaryIsVisible = reportSummaryDimensions.top + 60 < window.innerHeight;
		const isMobile = windowWidth <= 576;

		if ((!topOfReportSummaryIsVisible || isMobile) && reportSummary) {
			window.scrollTo({
				// Take into account the height of the nav and some scroll padding to the top.
				top: reportSummaryDimensions.top - 60 + window.pageYOffset,
				left: 0,
				behavior: 'smooth',
			});
		}
	}, [calculationCount]);
};
