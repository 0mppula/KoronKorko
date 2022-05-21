import React from 'react';

const ChartBreakdownOptions = ({ report, setReport }) => {
	const { breakdown } = report;

	const handleOptionChange = (e) => {
		const breakdownOption = e.target.dataset.value;
		
		setReport({ ...report, breakdown: breakdownOption });
	};

	return (
		<div className="options-toggler-container">
			<div
				className={`${breakdown === 'yearly' ? 'active' : ''}`}
				onClick={(e) => handleOptionChange(e)}
				data-value="yearly"
				tabIndex={0}
			>
				Yearly
			</div>
			<div
				className={`${breakdown === 'monthly' ? 'active' : ''}`}
				onClick={(e) => handleOptionChange(e)}
				data-value="monthly"
				tabIndex={0}
			>
				Monthly
			</div>
		</div>
	);
};

export default ChartBreakdownOptions;
