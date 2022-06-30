import React from 'react';

import checkKeyDown from '../../helpers/checkKeyDown';

const ChartBreakdownOptions = ({ report, setReport }) => {
	const { breakdown } = report;

	const handleOptionChange = (e) => {
		const option = e.target.dataset.value;

		setReport({ ...report, breakdown: option });
	};

	return (
		<div className="options-toggler-container shadow-container">
			<div
				onKeyDown={(e) => checkKeyDown(e, () => handleOptionChange(e))}
				className={`${breakdown === 'yearly' ? 'active' : ''}`}
				onClick={(e) => handleOptionChange(e)}
				data-value="yearly"
				tabIndex={0}
			>
				Yearly
			</div>
			<div
				onKeyDown={(e) => checkKeyDown(e, () => handleOptionChange(e))}
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
