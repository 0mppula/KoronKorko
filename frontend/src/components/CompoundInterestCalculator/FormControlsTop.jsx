import React from 'react';
import { useSelector } from 'react-redux';
import { FaSyncAlt, FaSave, FaFileImport, FaEdit } from 'react-icons/fa';

const FormControlsTop = ({ openSaveModal, resetCalculator, openImportModal, openRenameModal }) => {
	const { activeCalculation } = useSelector((state) => state.compoundInterestCalculations);
	
	return (
		<div className="form-controls-top">
			<div className="form-controls-name">
				{activeCalculation && (
					<>
						<p>{activeCalculation.name}</p>
						<div className="icon success" onClick={openRenameModal}>
							<FaEdit />
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
