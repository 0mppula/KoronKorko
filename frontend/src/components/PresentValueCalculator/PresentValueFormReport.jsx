import React, { useEffect } from 'react';

import { formatCurrency } from '../../helpers/format';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';
import ReportContainer from '../CalculatorReportComponents/ReportContainer';
import ReportGroupContainer from '../CalculatorReportComponents/ReportGroupContainer';

const PresentValueFormReport = ({ report, calculationCount }) => {
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

	const { presentValue, currency } = report;

	return (
		<ReportContainer>
			<div className="summary-container auto-height">
				<ReportGroupContainer>
					<ReportGroup
						header="Present Value"
						value={formatCurrency(presentValue, currency?.locale, currency?.value)}
					/>
				</ReportGroupContainer>
			</div>
		</ReportContainer>
	);
};

export default PresentValueFormReport;
