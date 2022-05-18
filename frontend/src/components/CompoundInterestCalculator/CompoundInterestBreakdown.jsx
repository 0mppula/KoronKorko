import React from 'react';
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

const CompoundInterestBreakdown = ({ chartReport }) => {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	const options = {
		plugins: {
		},
		responsive: true,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
	};
	return (
		<div className="report-container">
			<h1>
				<span>B</span>reakdown
			</h1>
			<div className="summary-container">
				<Bar options={options} data={chartReport} />
			</div>
		</div>
	);
};

export default CompoundInterestBreakdown;
