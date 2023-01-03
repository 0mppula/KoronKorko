import React from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';
import ReportContainer from '../CalculatorReportComponents/ReportContainer';
import ReportGroupContainer from '../CalculatorReportComponents/ReportGroupContainer';
import ReportSummaryContainer from '../CalculatorReportComponents/ReportSummaryContainer';
import { useMobileScrollToReportContainer } from '../../hooks/useMobileScrollToReportContainer';

const MarkupCalculatorReport = ({ report, calculationCount }) => {
	useMobileScrollToReportContainer(calculationCount);

	const { profit, markup, currency } = report;

	return (
		<ReportContainer>
			<ReportSummaryContainer>
				<ReportGroupContainer>
					<ReportGroup
						header="Markup"
						value={isFinite(markup) ? formatPercentage(markup) : 'N/A'}
					/>

					<ReportGroup
						header="Profit"
						value={formatCurrency(profit, currency?.locale, currency?.value)}
					/>
				</ReportGroupContainer>
			</ReportSummaryContainer>
		</ReportContainer>
	);
};

export default MarkupCalculatorReport;
