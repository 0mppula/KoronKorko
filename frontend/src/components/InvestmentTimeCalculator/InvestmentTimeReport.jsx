import React, { useEffect } from 'react';

import { useWindowWidth } from '../../hooks/useWindowWidth';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';

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
		<div className="report-container">
			<h1>
				<span>S</span>ummary
			</h1>

			<div className="summary-container auto-height">
				<div className="report-top">
					<ReportGroup header="Years required" value={timeRequired.toFixed(2)} />

					<ReportGroup header="Months required" value={(timeRequired * 12).toFixed(2)} />

					<ReportGroup header="Days required" value={(timeRequired * 365).toFixed(2)} />
				</div>
			</div>
		</div>
	);
};

export default InvestmentTimeReport;
