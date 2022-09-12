import React, { useEffect } from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const MarkupCalculatorReport = ({ report, calculationCount }) => {
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

	const { profit, markup, currency } = report;

	return (
		<div className="report-container">
			<h1>
				<span>S</span>ummary
			</h1>

			<div className="summary-container auto-height">
				<div className="report-top">
					<div className="report-group">
						<p>Markup</p>
						<h2>{isFinite(markup) ? formatPercentage(markup) : 'N/A'}</h2>
					</div>

					<div className="report-group">
						<p>Profit</p>
						<h2>{formatCurrency(profit, currency?.locale, currency?.value)}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MarkupCalculatorReport;
