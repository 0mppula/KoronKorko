import { useEffect } from 'react';

/**
 *
 * If the top of the report summary container is not sufficiantly visible, this hook will scroll to
 * the top of the container.
 * @param {number} calculationCount The count of the number of calculations made. Every calculation
 * button click should increments this variable.
 */
export const useScrollToReportContainer = (calculationCount) => {
	useEffect(() => {
		const reportSummary = document.querySelector('.report-container');
		const reportSummaryDimensions = reportSummary.getBoundingClientRect();
		// Atleast 60px should be visible from the top of the element.
		const topOfReportSummaryIsVisible = reportSummaryDimensions.top + 60 < window.innerHeight;

		if (!topOfReportSummaryIsVisible && reportSummary) {
			window.scrollTo({
				// Take into account the height of the nav and some scroll padding to the top.
				top: reportSummaryDimensions.top - 60 + window.pageYOffset,
				left: 0,
				behavior: 'smooth',
			});
		}
	}, [calculationCount]);
};
