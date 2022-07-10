import React, { useEffect } from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';

const AnnualizedReturnReport = ({ report, calculationCount }) => {
	useEffect(() => {
		const reportSummary = document.querySelector('.report-container');

		if (reportSummary) {
			window.scrollTo({
				top: reportSummary.offsetTop - 450,
				left: 0,
				behavior: 'smooth',
			});
		}
	}, [calculationCount]);

	const { startingBalance, endingBalance, annualizedReturn, percentReturn, currency } = report;

	return (
		<div className="report-container">
			<h1>
				<span>S</span>ummary
			</h1>

			<div className="summary-container auto-height">
				<div className="report-top">
					<div className="report-group">
						<p>Starting Balance</p>
						<h2>
							{formatCurrency(startingBalance, currency?.locale, currency?.value)}
						</h2>
					</div>
					<div className="report-group">
						<p>Ending Balance</p>
						<h2>{formatCurrency(endingBalance, currency?.locale, currency?.value)}</h2>
					</div>
					<div className="report-group">
						<p>Annualized Return</p>
						<h2>{formatPercentage(annualizedReturn)}</h2>
					</div>
					<div className="report-group">
						<p>Percent Return</p>
						<h2>{formatPercentage(percentReturn)}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnnualizedReturnReport;
