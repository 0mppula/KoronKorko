import React from 'react';

import disableArrowKeys from '../../helpers/disableArrowKeys';

const DurationInput = ({ duration, handleChange, label, error }) => {
	return (
		<>
			<div className="input-group">
				<label htmlFor="duration">{label}</label>
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
		</>
	);
};

DurationInput.defaultProps = {
	label: 'Duration',
};

export default DurationInput;
