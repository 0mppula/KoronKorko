import React from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import './styles.css';

const CompoundInterestReport = ({ report }) => {
	const { futureValue, totalProfit, startingBalance, totalReturn, currency } = report;
	
	return (
		<div className="report-container">
			<div className="report-top">
				<div className="report-group">
					<p>Future Value</p>
					<h2>{formatCurrency(futureValue, currency?.locale, currency?.value)}</h2>
				</div>
				<div className="report-group">
					<p>Total Profit</p>
					<h2>{formatCurrency(totalProfit, currency?.locale, currency?.value)}</h2>
				</div>
				<div className="report-group">
					<p>Starting Balance</p>
					<h2>{formatCurrency(startingBalance, currency?.locale, currency?.value)}</h2>
				</div>
				<div className="report-group">
					<p>Total Return</p>
					<h2>{formatPercentage(totalReturn)}</h2>
				</div>
			</div>
		</div>
	);
};

export default CompoundInterestReport;
