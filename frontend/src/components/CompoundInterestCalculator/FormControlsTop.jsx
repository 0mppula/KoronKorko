import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSyncAlt, FaSave, FaFileImport, FaEdit } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';

import { closeCalculation } from '../../features/compoundInterestCalculator/compoundInterestCalculatorSlice';
import checkKeyDown from '../../helpers/checkKeyDown';

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
								tabIndex={0}
								className="icon success"
								title="Rename calculation"
								onClick={openRenameModal}
								onKeyDown={(e) => checkKeyDown(e, openRenameModal)}
							>
								<FaEdit />
							</div>
							<div
								tabIndex={0}
								className="icon ri danger"
								title="Close calculation"
								onClick={handleClose}
								onKeyDown={(e) => checkKeyDown(e, handleClose)}
							>
								<RiCloseLine />
							</div>
						</div>
					</>
				)}
			</div>
			<div className="form-controls-icons">
				<div
					tabIndex={0}
					className="icon success"
					title="Import calculation"
					onClick={openImportModal}
					onKeyDown={(e) => checkKeyDown(e, openImportModal)}
				>
					<FaFileImport />
				</div>
				<div
					tabIndex={0}
					className="icon success"
					title="Save calculation"
					onClick={openSaveModal}
					onKeyDown={(e) => checkKeyDown(e, openSaveModal)}
				>
					<FaSave />
				</div>
				<div
					tabIndex={0}
					className="icon danger"
					title="Reset calculator"
					onClick={resetCalculator}
					onKeyDown={(e) => checkKeyDown(e, resetCalculator)}
				>
					<FaSyncAlt />
				</div>
			</div>
		</div>
	);
};

export default FormControlsTop;
