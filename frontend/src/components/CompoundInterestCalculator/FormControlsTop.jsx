import React from 'react';
import { FaSyncAlt, FaSave, FaFileImport } from 'react-icons/fa';

const FormControlsTop = ({ openCalculation, save, resetCalculator }) => {
	return (
		<div className="form-controls-top">
			<div className="icon success" onClick={openCalculation}>
				<FaFileImport />
			</div>
			<div className="icon success" onClick={save}>
				<FaSave />
			</div>
			<div className="icon danger" onClick={resetCalculator}>
				<FaSyncAlt />
			</div>
		</div>
	);
};

export default FormControlsTop;
