import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiCloseLine } from 'react-icons/ri';
import { FaFileImport, FaTrash } from 'react-icons/fa';

import checkKeyDown from '../../../helpers/checkKeyDown';

import {
	getCalculations,
	getCalculation,
	deleteCalculation,
} from '../../../features/compoundInterestCalculator/compoundInterestCalculatorSlice';

const CompoundInterestImportModal = ({ modalOpen, setModalOpen, setActiveCalculationId }) => {
	const { calculations } = useSelector((state) => state.compoundInterestCalculations);
	const dispatch = useDispatch();

	useEffect(() => {
		document.addEventListener('click', closeOnOutsideClick);
		document.addEventListener('keydown', closeWithEsc);

		return () => {
			document.removeEventListener('click', closeOnOutsideClick);
			document.removeEventListener('keydown', closeWithEsc);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (modalOpen) {
			dispatch(getCalculations());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalOpen]);

	const closeModal = () => {
		setModalOpen(false);
	};

	const closeWithEsc = (e) => {
		const key = e.key;
		key === 'Escape' && closeModal();
	};

	const closeOnOutsideClick = (e) => {
		const modalOverlayClass = 'compound-interest-modal-overlay';
		if (e.target.classList.contains(modalOverlayClass)) {
			setModalOpen(false);
		}
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
		<div className={`compound-interest-modal-overlay ${modalOpen ? 'show' : ''}`}>
			<div className="compound-interest-modal">
				<div
					tabIndex={`${modalOpen ? 0 : -1}`}
					className="close-container"
					onClick={() => setModalOpen(false)}
					onKeyDown={(e) => checkKeyDown(e, () => setModalOpen(false))}
				>
					<RiCloseLine />
				</div>
				<div className="modal-header">
					<h2>Import Your Calculation</h2>
				</div>
				<div className="modal-mody">
					{calculations.length > 0 ? (
						<ul>
							{calculations.map((calculation) => (
								<li key={calculation._id} className="calculation-item">
									<div className="calculation-item-name">{calculation.name}</div>
									<div className="calculation-item-options">
										<div
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
										</div>
										<div
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
										</div>
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

export default CompoundInterestImportModal;
