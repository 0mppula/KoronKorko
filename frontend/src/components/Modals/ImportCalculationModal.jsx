import React, { useState, useEffect, useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { FaFileImport, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import useCloseOnClickOutsideOrEsc from '../../hooks/useCloseOnClickOutsideOrEsc';
import useFocusTrap from '../../hooks/useFocusTrap';

const ImportCalculationModal = ({
	modalOpen,
	setModalOpen,
	calculations,
	getCalculations,
	getCalculation,
	deleteCalculation,
	setActiveCalculationId,
	isLoading,
}) => {
	const [fetched, setFetched] = useState(false);

	const dispatch = useDispatch();
	const outerModalRef = useRef();
	const innerModalRef = useRef();

	useCloseOnClickOutsideOrEsc(innerModalRef, modalOpen, setModalOpen);
	useFocusTrap(outerModalRef, modalOpen, !isLoading && fetched);

	useEffect(() => {
		if (modalOpen) {
			dispatch(getCalculations());
			setFetched(true);
		} else {
			// Blur modals last focused element before closing.
			document.activeElement.blur();
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
			ref={outerModalRef}
		>
			<div className="calculator-modal" ref={innerModalRef}>
				<button
					tabIndex={`${modalOpen ? 0 : -1}`}
					className="close-container"
					onClick={closeModal}
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
										>
											<FaFileImport />
										</button>

										<button
											tabIndex={`${modalOpen ? 0 : -1}`}
											className="icon danger"
											title="Delete calculation"
											onClick={() => removeCalculation(calculation._id)}
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
