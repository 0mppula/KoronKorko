import React from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import LoadingSmall from '../Loading/LoadingSmall';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';
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
							<ReportGroup
								header="Future Value"
								value={formatCurrency(
									futureValue,
									currency?.locale,
									currency?.value
								)}
							/>

							<ReportGroup
								header="Total Profit"
								value={formatCurrency(
									totalProfit,
									currency?.locale,
									currency?.value
								)}
							/>

							<ReportGroup
								header="Initial Amount"
								value={formatCurrency(principal, currency?.locale, currency?.value)}
							/>

							<ReportGroup
								header={depositting ? 'Total Deposits' : 'Total Withdrawals'}
								value={formatCurrency(
									additionalContributions,
									currency?.locale,
									currency?.value
								)}
							/>

							<ReportGroup
								header="Net Contributions"
								value={formatCurrency(
									totalContribution,
									currency?.locale,
									currency?.value
								)}
							/>

							<ReportGroup
								header="Total Return (APY)"
								value={formatPercentage(totalReturn)}
							/>
						</div>
					)}
				</>
			</div>
		</div>
	);
};

export default CompoundInterestReport;
