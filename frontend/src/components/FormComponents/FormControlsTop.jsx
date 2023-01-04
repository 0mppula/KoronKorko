import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FaSyncAlt, FaSave, FaFileImport, FaEdit } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';

import checkKeyDown from '../../helpers/checkKeyDown';

const FormControlsTop = ({
	openRenameModal,
	closeActiveCalculation,
	openImportModal,
	openSaveModal,
	resetForm,
}) => {
	const { activeCalculation } = useSelector((state) => state.compoundInterestCalculations);

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
								onClick={closeActiveCalculation}
								onKeyDown={(e) => checkKeyDown(e, closeActiveCalculation)}
							>
								<RiCloseLine />
							</div>
						</div>
					</>
				)}
			</div>

			<div className="form-controls-icons">
				{openImportModal && (
					<div
						tabIndex={0}
						className="icon success"
						title="Import calculation"
						onClick={openImportModal}
						onKeyDown={(e) => checkKeyDown(e, openImportModal)}
					>
						<FaFileImport />
					</div>
				)}

				{openSaveModal && (
					<div
						tabIndex={0}
						className="icon success"
						title="Save calculation"
						onClick={openSaveModal}
						onKeyDown={(e) => checkKeyDown(e, openSaveModal)}
					>
						<FaSave />
					</div>
				)}

				{resetForm && (
					<div
						tabIndex={0}
						className="icon danger"
						title="Reset calculator"
						onClick={resetForm}
						onKeyDown={(e) => checkKeyDown(e, resetForm)}
					>
						<FaSyncAlt />
					</div>
				)}
			</div>
		</div>
	);
};

FormControlsTop.propTypes = {
	openRenameModal: PropTypes.func,
	closeActiveCalculation: PropTypes.func,
	openImportModal: PropTypes.func,
	openSaveModal: PropTypes.func,
	resetForm: PropTypes.func,
};

export default FormControlsTop;
