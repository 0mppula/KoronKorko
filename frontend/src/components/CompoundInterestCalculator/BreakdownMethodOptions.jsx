import React from 'react';

const BreakdownMethodOptions = ({ breakdownMethod, setBreakdownMethod }) => {
	const handleOptionChange = (e) => {
		const option = e.target.dataset.value;

		setBreakdownMethod(option);
	};
	return (
		<div className="options-toggler-container">
			<div
				className={`${breakdownMethod === 'chart' ? 'active' : ''}`}
				onClick={(e) => handleOptionChange(e)}
				data-value="chart"
				tabIndex={0}
			>
				Chart
			</div>
			<div
				className={`${breakdownMethod === 'table' ? 'active' : ''}`}
				onClick={(e) => handleOptionChange(e)}
				data-value="table"
				tabIndex={0}
			>
				Table
			</div>
		</div>
	);
};

export default BreakdownMethodOptions;
