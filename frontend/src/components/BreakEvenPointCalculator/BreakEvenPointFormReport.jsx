import React from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';
import ReportContainer from '../CalculatorReportComponents/ReportContainer';
import ReportGroupContainer from '../CalculatorReportComponents/ReportGroupContainer';
import ReportSummaryContainer from '../CalculatorReportComponents/ReportSummaryContainer';
import { useScrollToReportContainer } from '../../hooks/useScrollToReportContainer';

const BreakEvenPointFormReport = ({ report, calculationCount }) => {
	useScrollToReportContainer(calculationCount);

	const {
		breakEvenPointUnits,
		breakEvenPointMoney,
		contributionMarginMoney,
		contributionMarginPercent,
		currency,
	} = report;

	return (
		<ReportContainer>
			<ReportSummaryContainer>
				<ReportGroupContainer>
					<ReportGroup
						header="Break Even Point"
						value={
							isFinite(breakEvenPointUnits) ? breakEvenPointUnits.toFixed(2) : 'N/A'
						}
					/>

					<ReportGroup
						header="Break Even Point Revenue"
						value={
							isFinite(breakEvenPointUnits)
								? formatCurrency(
										breakEvenPointMoney,
										currency?.locale,
										currency?.value
								  )
								: 'N/A'
						}
					/>

					<ReportGroup
						header="Contribution Margin %"
						value={formatPercentage(contributionMarginPercent)}
					/>

					<ReportGroup
						header="Contribution Margin"
						value={formatCurrency(
							contributionMarginMoney,
							currency?.locale,
							currency?.value
						)}
					/>
				</ReportGroupContainer>
			</ReportSummaryContainer>
		</ReportContainer>
	);
};

export default BreakEvenPointFormReport;
