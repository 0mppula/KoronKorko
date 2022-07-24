import React, { useState, useEffect } from 'react';

import { formatCurrency } from '../../helpers/format';

const PresentValueFormReport = ({ report, calculationCount }) => {
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
