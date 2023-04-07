import React from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';
import ReportContainer from '../CalculatorReportComponents/ReportContainer';
import ReportGroupContainer from '../CalculatorReportComponents/ReportGroupContainer';
import ReportSummaryContainer from '../CalculatorReportComponents/ReportSummaryContainer';
import { useScrollToReportContainer } from '../../hooks/useScrollToReportContainer';

const AnnualizedReturnReport = ({ report, calculationCount }) => {
	useScrollToReportContainer(calculationCount);

	const { startingBalance, endingBalance, annualizedReturn, percentReturn, currency } = report;

	return (
		<ReportContainer>
			<ReportSummaryContainer>
				<ReportGroupContainer>
					<ReportGroup
						header="Starting Balance"
						value={formatCurrency(startingBalance, currency?.locale, currency?.value)}
					/>

					<ReportGroup
						header="Ending Balance"
						value={formatCurrency(endingBalance, currency?.locale, currency?.value)}
					/>

					<ReportGroup
						header="Annualized Return"
						value={
							annualizedReturn !== Infinity
								? formatPercentage(annualizedReturn)
								: 'N/A'
						}
					/>

					<ReportGroup header="Percent Return" value={formatPercentage(percentReturn)} />
				</ReportGroupContainer>
			</ReportSummaryContainer>
		</ReportContainer>
	);
};

export default AnnualizedReturnReport;
