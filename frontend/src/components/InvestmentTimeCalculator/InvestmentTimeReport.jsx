import React from 'react';

import ReportGroup from '../CalculatorReportComponents/ReportGroup';
import ReportContainer from '../CalculatorReportComponents/ReportContainer';
import ReportGroupContainer from '../CalculatorReportComponents/ReportGroupContainer';
import ReportSummaryContainer from '../CalculatorReportComponents/ReportSummaryContainer';
import { useScrollToReportContainer } from '../../hooks/useScrollToReportContainer';

const InvestmentTimeReport = ({ report, calculationCount }) => {
	useScrollToReportContainer(calculationCount);

	const { timeRequired } = report;

	return (
		<ReportContainer>
			<ReportSummaryContainer>
				<ReportGroupContainer>
					<ReportGroup header="Years required" value={timeRequired.toFixed(2)} />

					<ReportGroup header="Months required" value={(timeRequired * 12).toFixed(2)} />

					<ReportGroup header="Days required" value={(timeRequired * 365).toFixed(2)} />
				</ReportGroupContainer>
			</ReportSummaryContainer>
		</ReportContainer>
	);
};

export default InvestmentTimeReport;
