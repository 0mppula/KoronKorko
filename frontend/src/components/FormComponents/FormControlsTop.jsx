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
							<button
								className="icon success"
								title="Rename calculation"
								onClick={openRenameModal}
								onKeyDown={(e) => checkKeyDown(e, openRenameModal)}
							>
								<FaEdit />
							</button>

							<button
								className="icon ri danger"
								title="Close calculation"
								onClick={closeActiveCalculation}
								onKeyDown={(e) => checkKeyDown(e, closeActiveCalculation)}
							>
								<RiCloseLine />
							</button>
						</div>
					</>
				)}
			</div>

			<div className="form-controls-icons">
				{openImportModal && (
					<button
						className="icon success"
						title="Import calculation"
						onClick={openImportModal}
						onKeyDown={(e) => checkKeyDown(e, openImportModal)}
					>
						<FaFileImport />
					</button>
				)}

				{openSaveModal && (
					<button
						className="icon success"
						title="Save calculation"
						onClick={openSaveModal}
						onKeyDown={(e) => checkKeyDown(e, openSaveModal)}
					>
						<FaSave />
					</button>
				)}

				{resetForm && (
					<button
						className="icon danger"
						title="Reset calculator"
						onClick={resetForm}
						onKeyDown={(e) => checkKeyDown(e, resetForm)}
					>
						<FaSyncAlt />
					</button>
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
