import React from 'react';

import { formatCurrency, formatPercentage } from '../../utils/format';
import './styles.css';

const CompoundInterestReport = ({ report }) => {
	return (
		<div className="report-container">
			<div className="report-top">
				<div className="report-group">
					<p>Future Value</p>
					<h2>{formatCurrency(report.futureValue, 'en-US', 'USD')}</h2>
				</div>
				<div className="report-group">
					<p>Total Profit</p>
					<h2>{formatCurrency(report.totalProfit, 'en-US', 'USD')}</h2>
				</div>
				<div className="report-group">
					<p>Starting Balance</p>
					<h2>{formatCurrency(report.startingBalance, 'en-US', 'USD')}</h2>
				</div>
				<div className="report-group">
					<p>Total Return</p>
					<h2>{formatPercentage(report.totalReturn)}</h2>
				</div>
			</div>
		</div>
	);
};

export default CompoundInterestReport;
