import React from 'react';

import './CompoundInterestReport.css';

const CompoundInterestReport = ({ report }) => {
	return (
		<div className="report-container">
			<div className="report-top">
				<div className="report-group">
					<p>Starting Balance</p>
					<h2>{report.startingBalance}</h2>
				</div>
				<div className="report-group">
					<p>Future Value</p>
					<h2>{report.futureValue}</h2>
				</div>
				<div className="report-group">
					<p>Total Profit</p>
					<h2>{report.totalProfit}</h2>
				</div>
				<div className="report-group">
					<p>Annualized Return</p>
					<h2>{report.annualizedReturn}</h2>
				</div>
			</div>
		</div>
	);
};

export default CompoundInterestReport;
