import React, { useState, useEffect } from 'react';

const InvestmentTimeReport = ({ report, calculationCount }) => {
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
