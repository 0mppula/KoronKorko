import React, { useState, useEffect } from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';

const BreakEvenPointFormReport = ({ report, calculationCount }) => {
	const [windowWidth, setWindowWidth] = useState(getWindowWidth());

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

	useEffect(() => {
		function handleResize() {
			setWindowWidth(getWindowWidth());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	function getWindowWidth() {
		const { innerWidth: width } = window;
		return width;
	}

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
