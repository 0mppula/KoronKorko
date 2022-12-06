import React, { useEffect } from 'react';

import { formatCurrency } from '../../helpers/format';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';

const PresentValueFormReport = ({ report, calculationCount }) => {
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

	const { presentValue, currency } = report;

	return (
		<div className="report-container">
			<h1>
				<span>S</span>ummary
			</h1>

			<div className="summary-container auto-height">
				<div className="report-group-container">
					<ReportGroup
						header="Present Value"
						value={formatCurrency(presentValue, currency?.locale, currency?.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default PresentValueFormReport;
