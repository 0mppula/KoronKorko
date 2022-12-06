import React, { useEffect } from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';
import ReportContainer from '../CalculatorReportComponents/ReportContainer';
import ReportGroupContainer from '../CalculatorReportComponents/ReportGroupContainer';
import ReportSummaryContainer from '../CalculatorReportComponents/ReportSummaryContainer';

const MarkupCalculatorReport = ({ report, calculationCount }) => {
	const windowWidth = useWindowWidth();

	useEffect(() => {
		const reportSummary = document.querySelector('.report-container');

		if (windowWidth <= 576 && reportSummary) {
			window.scrollTo({
				top: reportSummary.offsetTop - 60,
				left: 0,
				behavior: 'smooth',
			});
		}
	}, [calculationCount, windowWidth]);

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
