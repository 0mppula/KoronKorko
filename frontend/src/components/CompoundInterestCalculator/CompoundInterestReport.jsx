import React from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import LoadingSmall from '../Loading/LoadingSmall';
import './styles.css';

const CompoundInterestReport = ({ report, loadingCalculation }) => {
	const {
		futureValue,
		totalProfit,
		totalContribution,
		totalReturn,
		principal,
		additionalContributions,
		depositting,
		currency,
	} = report;

	return (
		<div className="report-container">
			<h1>
				<span>S</span>ummary
			</h1>
			<div className={`summary-container ${loadingCalculation ? 'loading' : ''}`}>
				<>
					{loadingCalculation ? (
						<LoadingSmall />
					) : (
						<div className="report-top">
							<div className="report-group">
								<p>Future Value</p>
								<h2>
									{formatCurrency(futureValue, currency?.locale, currency?.value)}
								</h2>
							</div>
							<div className="report-group">
								<p>Total Profit</p>
								<h2>
									{formatCurrency(totalProfit, currency?.locale, currency?.value)}
								</h2>
							</div>
							<div className="report-group">
								<p>Initial Amount</p>
								<h2>
									{formatCurrency(principal, currency?.locale, currency?.value)}
								</h2>
							</div>
							<div className="report-group">
								<p>{depositting ? 'Total Deposits' : 'Total Withdrawals'}</p>
								<h2>
									{formatCurrency(
										additionalContributions,
										currency?.locale,
										currency?.value
									)}
								</h2>
							</div>
							<div className="report-group">
								<p>Net Contributions</p>
								<h2>
									{formatCurrency(
										totalContribution,
										currency?.locale,
										currency?.value
									)}
								</h2>
							</div>
							<div className="report-group">
								<p>Total Return (APY)</p>
								<h2>{formatPercentage(totalReturn)}</h2>
							</div>
						</div>
					)}
				</>
			</div>
		</div>
	);
};

export default CompoundInterestReport;
