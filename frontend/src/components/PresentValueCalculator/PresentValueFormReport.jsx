import React from 'react';

import { formatCurrency } from '../../helpers/format';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';
import ReportContainer from '../CalculatorReportComponents/ReportContainer';
import ReportGroupContainer from '../CalculatorReportComponents/ReportGroupContainer';
import ReportSummaryContainer from '../CalculatorReportComponents/ReportSummaryContainer';
import { useMobileScrollToReportContainer } from '../../hooks/useMobileScrollToReportContainer';

const PresentValueFormReport = ({ report, calculationCount }) => {
	useMobileScrollToReportContainer(calculationCount);

	const { presentValue, currency } = report;

	return (
		<ReportContainer>
			<ReportSummaryContainer>
				<ReportGroupContainer>
					<ReportGroup
						header="Present Value"
						value={formatCurrency(presentValue, currency?.locale, currency?.value)}
					/>
				</ReportGroupContainer>
			</ReportSummaryContainer>
		</ReportContainer>
	);
};

export default PresentValueFormReport;
