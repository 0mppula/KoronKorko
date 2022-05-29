import React from 'react';
import { FaSyncAlt, FaSave, FaFileImport } from 'react-icons/fa';

const FormControlsTop = ({ openSaveModal, resetCalculator, openImportModal }) => {
	return (
		<div className="form-controls-top">
			<div className="icon success" title="Import calculation" onClick={openImportModal}>
				<FaFileImport />
			</div>
			<div className="icon success" title="Save calculation" onClick={openSaveModal}>
				<FaSave />
			</div>
			<div className="icon danger" title="Reset calculator" onClick={resetCalculator}>
				<FaSyncAlt />
			</div>
		</div>
	);
};

export default FormControlsTop;
