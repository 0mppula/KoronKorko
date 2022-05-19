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

import { cssVar } from '../../helpers/getCssVariable';
import { formatCurrency, formatCurrencyK } from '../../helpers/format';
import createChartData from '../../helpers/createChartData';

const CompoundInterestBreakdown = ({ formData, report, darkMode }) => {
	const [chartReport, setChartReport] = useState(null);

	useEffect(() => {
		const chartData = createChartData(formData, darkMode);

		setChartReport(chartData);
		// eslint-disable-next-line
	}, [report, darkMode]);

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
						const defaultTitle = context[0].label;
						return `Month: ${defaultTitle}`;
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
				},
				title: {
					text: 'Months',
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
			<div className="summary-container chart-container">
				{chartReport && (
					<Bar
						className="interest-chart"
						options={options}
						data={chartReport}
						plugins={plugins}
					/>
				)}
			</div>
		</div>
	);
};

export default CompoundInterestBreakdown;
