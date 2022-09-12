import React, { useEffect } from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const BreakEvenPointFormReport = ({ report, calculationCount }) => {
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

	const {
		breakEvenPointUnits,
		breakEvenPointMoney,
		contributionMarginMoney,
		contributionMarginPercent,
		currency,
	} = report;

	return (
		<div className="report-container">
			<h1>
				<span>S</span>ummary
			</h1>

			<div className="summary-container auto-height">
				<div className="report-top">
					<div className="report-group">
						<p>Break Even Point</p>
						<h2>
							{isFinite(breakEvenPointUnits) ? breakEvenPointUnits.toFixed(2) : 'N/A'}
						</h2>
					</div>
					<div className="report-group">
						<p>Break Even Point Revenue</p>
						<h2>
							{isFinite(breakEvenPointUnits)
								? formatCurrency(
										breakEvenPointMoney,
										currency?.locale,
										currency?.value
								  )
								: 'N/A'}
						</h2>
					</div>
					<div className="report-group">
						<p>Contribution Margin %</p>
						<h2>{formatPercentage(contributionMarginPercent)}</h2>
					</div>
					<div className="report-group">
						<p>Contribution Margin</p>
						<h2>
							{formatCurrency(
								contributionMarginMoney,
								currency?.locale,
								currency?.value
							)}
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BreakEvenPointFormReport;
