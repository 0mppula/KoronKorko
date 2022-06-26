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

import { cssVar } from '../../helpers/getCssVariable';
import { formatCurrency, formatCurrencyK } from '../../helpers/format';
import createChartData from '../../helpers/createChartData';
import ChartBreakdownOptions from './ChartBreakdownOptions';
import LoadingSmall from '../Loading/LoadingSmall';

const CompoundInterestBreakdown = ({
	formData,
	report,
	setReport,
	calculationCount,
	loadingCalculation,
	setLoadingCalculation,
}) => {
	const [chartReport, setChartReport] = useState(null);
	const { breakdown } = report;
	const { darkMode } = useSelector((state) => state.theme);

	useEffect(() => {
		const getChartData = () => {
			const chartData = createChartData(formData, breakdown, darkMode);

			setChartReport(chartData);
			setTimeout(() => setLoadingCalculation(false), 500);
		};

		getChartData();
		// eslint-disable-next-line
	}, [report, darkMode]);

	useEffect(() => {
		const reportSummary = document.querySelector('.report-container');

		if (loadingCalculation && reportSummary) {
			window.scrollTo({
				top: reportSummary.offsetTop - 60,
				left: 0,
				behavior: 'smooth',
			});
		}
	}, [calculationCount, loadingCalculation]);

	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
		<div className="report-container">
			<h1>
				<span>B</span>reakdown
			</h1>
			<div className={`summary-container ${loadingCalculation ? 'loading' : ''}`}>
				<>
					{loadingCalculation ? (
						<LoadingSmall />
					) : (
						<>
							<ChartBreakdownOptions report={report} setReport={setReport} />
							{chartReport && (
								<div className="chart-container">
									<Bar
										className="interest-chart"
										options={options}
										data={chartReport}
										plugins={plugins}
									/>
								</div>
							)}
						</>
					)}
				</>
			</div>
		</div>
	);
};

export default CompoundInterestBreakdown;
