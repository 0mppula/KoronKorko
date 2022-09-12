import React, { useEffect } from 'react';

import { useWindowWidth } from '../../hooks/useWindowWidth';

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
					<div className="report-group">
						<p>Years required</p>
						<h2>{timeRequired.toFixed(2)}</h2>
					</div>
					<div className="report-group">
						<p>Months required</p>
						<h2>{(timeRequired * 12).toFixed(2)}</h2>
					</div>
					<div className="report-group">
						<p>Days required</p>
						<h2>{(timeRequired * 365).toFixed(2)}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InvestmentTimeReport;
