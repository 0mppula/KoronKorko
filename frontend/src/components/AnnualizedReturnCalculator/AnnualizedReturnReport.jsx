import React, { useEffect } from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';

const AnnualizedReturnReport = ({ report, calculationCount }) => {
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

	const { startingBalance, endingBalance, annualizedReturn, percentReturn, currency } = report;

	return (
		<div className="report-container">
			<h1>
				<span>S</span>ummary
			</h1>

			<div className="summary-container auto-height">
				<div className="report-top">
					<ReportGroup
						header="Starting Balance"
						value={formatCurrency(startingBalance, currency?.locale, currency?.value)}
					/>

					<ReportGroup
						header="Ending Balance"
						value={formatCurrency(endingBalance, currency?.locale, currency?.value)}
					/>

					<ReportGroup
						header="Annualized Return"
						value={
							annualizedReturn !== Infinity
								? formatPercentage(annualizedReturn)
								: 'N/A'
						}
					/>

					<ReportGroup header="Percent Return" value={formatPercentage(percentReturn)} />
				</div>
			</div>
		</div>
	);
};

export default AnnualizedReturnReport;
