import React from 'react';

import checkKeyDown from '../../helpers/checkKeyDown';

const BreakdownMethodOptions = ({ breakdownMethod, setBreakdownMethod }) => {
	const handleOptionChange = (e) => {
		const option = e.target.dataset.value;

		setBreakdownMethod(option);
	};
	return (
		<div className="options-toggler-container shadow-container">
			<div
				onKeyDown={(e) => checkKeyDown(e, () => handleOptionChange(e))}
				className={`${breakdownMethod === 'chart' ? 'active' : ''}`}
				onClick={(e) => handleOptionChange(e)}
				data-value="chart"
				tabIndex={0}
			>
				Chart
			</div>
			<div
				onKeyDown={(e) => checkKeyDown(e, () => handleOptionChange(e))}
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
