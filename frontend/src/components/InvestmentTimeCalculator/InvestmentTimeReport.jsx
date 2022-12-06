import React, { useEffect } from 'react';

import { useWindowWidth } from '../../hooks/useWindowWidth';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';
import ReportContainer from '../CalculatorReportComponents/ReportContainer';
import ReportGroupContainer from '../CalculatorReportComponents/ReportGroupContainer';

const InvestmentTimeReport = ({ report, calculationCount }) => {
	const windowWidth = useWindowWidth();

	useEffect(() => {
		const reportSummary = document.querySelector('.report-container');

		if (windowWidth <= 576 && reportSummary) {
			window.scrollTo({
				top: reportSummary.offsetTop - 60,
				left: 0,
				behavior: 'smooth',
			});
		}
	}, [calculationCount, windowWidth]);

	const { timeRequired } = report;

	return (
		<ReportContainer>
			<div className="summary-container auto-height">
				<ReportGroupContainer>
					<ReportGroup header="Years required" value={timeRequired.toFixed(2)} />

					<ReportGroup header="Months required" value={(timeRequired * 12).toFixed(2)} />

					<ReportGroup header="Days required" value={(timeRequired * 365).toFixed(2)} />
				</ReportGroupContainer>
			</div>
		</ReportContainer>
	);
};

export default InvestmentTimeReport;
