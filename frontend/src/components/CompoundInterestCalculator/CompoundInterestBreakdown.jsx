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
import createChartData from '../../helpers/createChartData';

const CompoundInterestBreakdown = ({ formData, report, darkMode }) => {
	const [chartReport, setChartReport] = useState(null);

	useEffect(() => {
		const chartData = createChartData(formData, darkMode);

		setChartReport(chartData);
	}, [report, darkMode]);

	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				labels: {
					color: cssVar('--clr-text-primary'),
				},
			},
		},
		responsive: true,
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
					color: getComputedStyle(document.body).getPropertyValue('--clr-text-primary'),
				},
				grid: {
					color: getComputedStyle(document.body).getPropertyValue('--clr-gray'),
					borderColor: 'transparent',
					tickColor: 'transparent',
					drawBorder: true,
					drawTicks: true,
				},
			},
		},
	};

	return (
		<div className="report-container">
			<h1>
				<span>B</span>reakdown
			</h1>
			<div className="summary-container chart-container">
				{chartReport && (
					<Bar className="interest-chart" options={options} data={chartReport} />
				)}
			</div>
		</div>
	);
};

export default CompoundInterestBreakdown;
