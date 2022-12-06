import React, { useEffect } from 'react';

import { formatCurrency, formatPercentage } from '../../helpers/format';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import ReportGroup from '../CalculatorReportComponents/ReportGroup';

const BreakEvenPointFormReport = ({ report, calculationCount }) => {
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

	const {
		breakEvenPointUnits,
		breakEvenPointMoney,
		contributionMarginMoney,
		contributionMarginPercent,
		currency,
	} = report;

	return (
		<div className="report-container">
			<h1>
				<span>S</span>ummary
			</h1>

			<div className="summary-container auto-height">
				<div className="report-top">
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
				</div>
			</div>
		</div>
	);
};

export default BreakEvenPointFormReport;
