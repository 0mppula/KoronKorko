import React from 'react';
import { FaSyncAlt, FaSave } from 'react-icons/fa';

const FormControlsTop = ({ resetCalculator }) => {
	return (
		<div className="form-controls-top">
			<div className="icon save">
				<FaSave />
			</div>
			<div className="icon reset" onClick={resetCalculator}>
				<FaSyncAlt />
			</div>
		</div>
	);
};

export default FormControlsTop;
