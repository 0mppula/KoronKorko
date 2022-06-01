import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSyncAlt, FaSave, FaFileImport, FaEdit } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';

import { closeCalculation } from '../../features/compoundInterestCalculator/compoundInterestCalculatorSlice';

const FormControlsTop = ({ openSaveModal, resetCalculator, openImportModal, openRenameModal }) => {
	const { activeCalculation } = useSelector((state) => state.compoundInterestCalculations);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(closeCalculation());
	};

	return (
		<div className="form-controls-top">
			<div className="form-controls-name">
				{activeCalculation && (
					<>
						<p>{activeCalculation.name}</p>
						<div>
							<div
								className="icon success"
								title="Rename calculation"
								onClick={openRenameModal}
							>
								<FaEdit />
							</div>
							<div
								className="icon ri danger"
								title="Close calculation"
								onClick={handleClose}
							>
								<RiCloseLine />
							</div>
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
