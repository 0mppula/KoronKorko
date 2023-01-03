import React from 'react';

import checkKeyDown from '../../../helpers/checkKeyDown';

const BreakdownVisualOptionToggler = ({
	breakdownMethod,
	setBreakdownMethod,
	loadingCalculation,
}) => {
	const handleOptionChange = (e) => {
		const option = e.target.dataset.value;

		setBreakdownMethod(option);
	};

	return (
		<div className="options-toggler-container shadow-container">
			<div
				onKeyDown={(e) =>
					!loadingCalculation ? checkKeyDown(e, () => handleOptionChange(e)) : null
				}
				className={`${breakdownMethod === 'chart' ? 'active' : ''}`}
				onClick={(e) => (!loadingCalculation ? handleOptionChange(e) : null)}
				data-value="chart"
				tabIndex={0}
			>
				Chart
			</div>
			<div
				onKeyDown={(e) =>
					!loadingCalculation ? checkKeyDown(e, () => handleOptionChange(e)) : null
				}
				className={`${breakdownMethod === 'table' ? 'active' : ''}`}
				onClick={(e) => (!loadingCalculation ? handleOptionChange(e) : null)}
				data-value="table"
				tabIndex={0}
			>
				Table
			</div>
		</div>
	);
};

export default BreakdownVisualOptionToggler;
