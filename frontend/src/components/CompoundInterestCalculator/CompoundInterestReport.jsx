import React from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import LoadingSmall from '../Loading/LoadingSmall';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';
import './styles.css';
import ReportContainer from '../CalculatorReportComponents/ReportContainer';

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
		<ReportContainer>
			<div className={`summary-container ${loadingCalculation ? 'loading' : ''}`}>
				<>
					{loadingCalculation ? (
						<LoadingSmall />
					) : (
						<div className="report-group-container">
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
		</ReportContainer>
	);
};

export default CompoundInterestReport;
