import React, { useEffect, useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { FaFileImport, FaTrash } from 'react-icons/fa';

import checkKeyDown from '../../helpers/checkKeyDown';
import { useDispatch } from 'react-redux';
import useCloseOnClickOutsideOrEsc from '../../hooks/useCloseOnClickOutsideOrEsc';

const ImportCalculationModal = ({
	modalOpen,
	setModalOpen,
	calculations,
	getCalculations,
	getCalculation,
	deleteCalculation,
	setActiveCalculationId,
}) => {
	const dispatch = useDispatch();
	const innerModalRef = useRef();

	useCloseOnClickOutsideOrEsc(innerModalRef, modalOpen, setModalOpen);

	useEffect(() => {
		if (modalOpen) {
			dispatch(getCalculations());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalOpen]);

	const closeModal = () => {
		setModalOpen(false);
	};

	const importCalculation = (calculationId) => {
		setActiveCalculationId(null);
		dispatch(getCalculation(calculationId));
		closeModal();
	};

	const removeCalculation = (calculationId) => {
		dispatch(deleteCalculation(calculationId));
	};

	return (
		<div
			className={`modal-overlay ${modalOpen ? 'show' : ''}`}
			aria-modal={modalOpen ? true : false}
		>
			<div className="compound-interest-modal" ref={innerModalRef}>
				<button
					tabIndex={`${modalOpen ? 0 : -1}`}
					className="close-container"
					onClick={() => setModalOpen(false)}
					onKeyDown={(e) => checkKeyDown(e, () => setModalOpen(false))}
				>
					<RiCloseLine />
				</button>

				<div className="modal-header">
					<h2>Import Your Calculation</h2>
				</div>

				<div className="modal-mody">
					{calculations?.length > 0 ? (
						<ul>
							{calculations.map((calculation) => (
								<li key={calculation._id} className="calculation-item">
									<div className="calculation-item-name">{calculation.name}</div>
									<div className="calculation-item-options">
										<button
											tabIndex={`${modalOpen ? 0 : -1}`}
											className="icon success"
											title="Import calculation"
											onClick={() => importCalculation(calculation._id)}
											onKeyDown={(e) =>
												checkKeyDown(e, () =>
													importCalculation(calculation._id)
												)
											}
										>
											<FaFileImport />
										</button>

										<button
											tabIndex={`${modalOpen ? 0 : -1}`}
											className="icon danger"
											title="Delete calculation"
											onClick={() => removeCalculation(calculation._id)}
											onKeyDown={(e) =>
												checkKeyDown(e, () =>
													removeCalculation(calculation._id)
												)
											}
										>
											<FaTrash />
										</button>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p>You do not have any saved calculations yet</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default ImportCalculationModal;
