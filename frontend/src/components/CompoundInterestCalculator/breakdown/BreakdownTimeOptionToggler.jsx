import React, { useRef } from 'react';

import checkKeyDown from '../../../helpers/checkKeyDown';

const BreakdownTimeOptionToggler = ({ report, setReport }) => {
	const { breakdown } = report;

	const RadioLabelRef1 = useRef();
	const RadioLabelRef2 = useRef();

	const handleOptionChange = (e) => {
		const selectedOption = e.target.name;

		setReport({ ...report, breakdown: selectedOption });
	};

	return (
		<div className="options-toggler-container shadow-container">
			<input
				className="custom-radio-input"
				type="radio"
				name="yearly"
				id="yearly"
				checked={breakdown === 'yearly'}
				onChange={(e) => handleOptionChange(e)}
			/>

			<label
				tabIndex={breakdown === 'yearly' ? -1 : 0}
				ref={RadioLabelRef1}
				onKeyDown={(e) => checkKeyDown(e, () => RadioLabelRef1.current.click())}
				htmlFor="yearly"
			>
				Yearly
			</label>

			<input
				className="custom-radio-input"
				type="radio"
				name="monthly"
				id="monthly"
				checked={breakdown === 'monthly'}
				onChange={(e) => handleOptionChange(e)}
			/>

			<label
				tabIndex={breakdown === 'monthly' ? -1 : 0}
				ref={RadioLabelRef2}
				onKeyDown={(e) => checkKeyDown(e, () => RadioLabelRef2.current.click())}
				htmlFor="monthly"
			>
				Monthly
			</label>
		</div>
	);
};

export default BreakdownTimeOptionToggler;
