import React, { useRef } from 'react';

import checkKeyDown from '../../../helpers/checkKeyDown';

const BreakdownVisualOptionToggler = ({
	breakdownMethod,
	setBreakdownMethod,
	loadingCalculation,
}) => {
	const RadioLabelRef1 = useRef();
	const RadioLabelRef2 = useRef();

	const handleOptionChange = (e) => {
		const selectedOption = e.target.name;

		setBreakdownMethod(selectedOption);
	};

	return (
		<div className="options-toggler-container shadow-container">
			<input
				className="custom-radio-input"
				type="radio"
				name="chart"
				id="chart"
				checked={breakdownMethod === 'chart'}
				onChange={(e) => (!loadingCalculation ? handleOptionChange(e) : null)}
			/>

			<label
				tabIndex={breakdownMethod === 'chart' ? -1 : 0}
				ref={RadioLabelRef1}
				onKeyDown={(e) => checkKeyDown(e, () => RadioLabelRef1.current.click())}
				htmlFor="chart"
			>
				Chart
			</label>

			<input
				className="custom-radio-input"
				type="radio"
				name="table"
				id="table"
				checked={breakdownMethod === 'table'}
				onChange={(e) => (!loadingCalculation ? handleOptionChange(e) : null)}
			/>

			<label
				tabIndex={breakdownMethod === 'table' ? -1 : 0}
				ref={RadioLabelRef2}
				onKeyDown={(e) => checkKeyDown(e, () => RadioLabelRef2.current.click())}
				htmlFor="table"
			>
				Table
			</label>
		</div>
	);
};

export default BreakdownVisualOptionToggler;
