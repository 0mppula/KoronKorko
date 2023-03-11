import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';

import { cssVar } from '../../../helpers/getCssVariable';
import { formatCurrency, formatCurrencyK } from '../../../helpers/format';
import createChartData from '../../../helpers/createChartData';
import BreakdownTimeOptionToggler from './BreakdownTimeOptionToggler';
import BreakdownVisualOptionToggler from './BreakdownVisualOptionToggler';
import LoadingSmall from '../../Loading/LoadingSmall';
import BreakdownTable from './BreakdownTable';
import DownloadTableButton from './DownloadTableButton';
import ReportContainer from '../../CalculatorReportComponents/ReportContainer';
import ReportSummaryContainer from '../../CalculatorReportComponents/ReportSummaryContainer';

const CompoundInterestBreakdown = ({
	formData,
	report,
	setReport,
	loadingCalculation,
	setLoadingCalculation,
}) => {
	const [chartReport, setChartReport] = useState(null);
	const [breakdownMethod, setBreakdownMethod] = useState('chart');
	const [tableLoading, setTableLoading] = useState(true);
	const { breakdown } = report;
	const { darkMode } = useSelector((state) => state.theme);

	useEffect(() => {
		const getChartData = async () => {
			setLoadingCalculation(true);
			const chartData = await createChartData(formData, breakdown, darkMode);
			setChartReport(chartData);
			setLoadingCalculation(false);
		};

		getChartData();
		// eslint-disable-next-line
	}, [report, darkMode]);

	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
	ChartJS.defaults.font.family = cssVar('--font-main');
	ChartJS.defaults.font.size = 13;

	const { currency } = report;

	const legendMargin = {
		id: 'legendMargin',
		beforeInit(chart) {
			const fitValue = chart.legend.fit;
			chart.legend.fit = function fit() {
				fitValue.bind(chart.legend)();
				return (this.height += 15);
			};
		},
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			tooltip: {
				callbacks: {
					title: (context) => {
						const defaultTitle = context[0].dataIndex;
						const breakdownType = breakdown === 'yearly' ? 'Year' : 'Month';
						return `${breakdownType}: ${defaultTitle}`;
					},
					label: (context) => {
						const dataset = context.dataset.data;
						const dataIndex = context.dataIndex;
						const label = context.dataset.label;
						const rawLabelValue = dataset[dataIndex];

						const formatted = `${label}: ${formatCurrency(
							rawLabelValue,
							currency.locale,
							currency.value
						)}`;
						return formatted;
					},
				},
			},
			legend: {
				labels: {
					color: cssVar('--clr-text-primary'),
					padding: 15,
				},
			},
		},
		scales: {
			x: {
				stacked: true,
				ticks: {
					color: cssVar('--clr-text-primary'),
					callback: (rawValue) => {
						return rawValue;
					},
				},
				title: {
					text: `${breakdown === 'yearly' ? 'Years' : 'Months'}`,
					color: cssVar('--clr-text-primary'),
					display: true,
				},
				grid: { color: 'transparent', drawBorder: true, drawTicks: true },
			},
			y: {
				stacked: true,
				ticks: {
					color: cssVar('--clr-text-primary'),
					callback: (rawValue) => {
						return `${formatCurrencyK(rawValue, undefined, currency.value)}`;
					},
				},
				grid: {
					color: cssVar('--clr-gray'),
					borderColor: 'transparent',
					tickColor: 'transparent',
					drawBorder: true,
					drawTicks: true,
				},
			},
		},
	};

	const plugins = [legendMargin];

	return (
		<ReportContainer header="Breakdown">
			<ReportSummaryContainer loading={loadingCalculation} autoHeight={false}>
				<>
					{loadingCalculation ? (
						<LoadingSmall />
					) : (
						<>
							<div className="summary-controls">
								{/* IF NOT LOADING THEN ABLE TO TOGGLE */}
								<BreakdownTimeOptionToggler
									report={report}
									setReport={setReport}
									loadingCalculation={loadingCalculation}
								/>
								<BreakdownVisualOptionToggler
									breakdownMethod={breakdownMethod}
									setBreakdownMethod={setBreakdownMethod}
									loadingCalculation={loadingCalculation}
								/>
								{chartReport && (
									<DownloadTableButton
										data={chartReport}
										breakdown={breakdown}
										currency={currency}
									/>
								)}
							</div>

							{/* When chart report is calculated show breakdown either in chart of table form */}
							{chartReport && breakdownMethod === 'chart' ? (
								<div
									className={`chart-container ${
										loadingCalculation ? 'loading-container' : ''
									}`}
								>
									<Bar
										className="interest-chart"
										options={options}
										data={chartReport}
										plugins={plugins}
									/>
								</div>
							) : (
								<div
									className={`table-container ${
										tableLoading || loadingCalculation
											? 'loading-container'
											: ''
									}`}
								>
									<BreakdownTable
										data={chartReport}
										breakdown={breakdown}
										currency={currency}
										tableLoading={tableLoading}
										setTableLoading={setTableLoading}
									/>
								</div>
							)}
						</>
					)}
				</>
			</ReportSummaryContainer>
		</ReportContainer>
	);
};

export default CompoundInterestBreakdown;
