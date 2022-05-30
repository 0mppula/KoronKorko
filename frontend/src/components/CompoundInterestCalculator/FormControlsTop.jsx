import React from 'react';
import { FaSyncAlt, FaSave, FaFileImport } from 'react-icons/fa';

const FormControlsTop = ({
	openSaveModal,
	resetCalculator,
	openImportModal,
	activeCalculation,
}) => {
	return (
		<div className="form-controls-top">
			<div className="form-controls-name">
				{activeCalculation && (
					<>
						<p>Calculation: {activeCalculation.name}</p>{' '}
						<div className="icon success">
							<FaFileImport />
						</div>
					</>
				)}
			</div>
			<div className="form-controls-icons">
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
		</div>
	);
};

export default FormControlsTop;
