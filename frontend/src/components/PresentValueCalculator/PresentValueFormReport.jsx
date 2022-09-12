import React, { useEffect } from 'react';

import { formatCurrency } from '../../helpers/format';
import { useWindowWidth } from '../../hooks/useWindowWidth';

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
				<div className="report-top">
					<div className="report-group">
						<p>Present Value</p>
						<h2>{formatCurrency(presentValue, currency?.locale, currency?.value)}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PresentValueFormReport;
