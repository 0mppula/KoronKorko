import React, { useRef } from 'react';
import Select from 'react-select';

import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import disableArrowKeys from '../../helpers/disableArrowKeys';
import { durationMultipliers } from '../../assets/data';

const DurationInput = ({
	duration,
	handleChange,
	durationMultiplier,
	handleFormSelectChange,
	error,
}) => {
	const durationRef = useRef();
	return (
		<>
			<div className="input-group">
				<label htmlFor="duration">Duration</label>
				<input
					id="duration"
					className={`${error ? 'error' : ''}`}
					name="duration"
					placeholder="Duration of your investment"
					type="number"
					min="0"
					max="200"
					step=".01"
					autoComplete="off"
					value={duration}
					onChange={(e) => handleChange(e)}
					onKeyDown={(e) => disableArrowKeys(e)}
					onWheel={() => document.activeElement.blur()}
				/>
			</div>
			<div className="input-group">
				{/* Duration selector */}
				<label onClick={() => durationRef.current.focus()}>Duration Type</label>
				<Select
					ref={durationRef}
					className="react-select-container"
					classNamePrefix="react-select"
					value={durationMultiplier}
					options={durationMultipliers}
					theme={customTheme}
					onChange={(e) => handleFormSelectChange(e, 'durationMultiplier')}
					styles={customStyles}
					isSearchable={false}
				/>
			</div>
		</>
	);
};

export default DurationInput;
