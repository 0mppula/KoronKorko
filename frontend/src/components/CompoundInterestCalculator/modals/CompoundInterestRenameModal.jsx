import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiCloseLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { renameCalculation } from '../../../features/compoundInterestCalculator/compoundInterestCalculatorSlice';
import checkKeyDown from '../../../helpers/checkKeyDown';

const CompoundInterestRenameModal = ({ modalOpen, setModalOpen }) => {
	const [calculationName, setCalculationName] = useState('');
	const { activeCalculation } = useSelector((state) => state.compoundInterestCalculations);

	const dispatch = useDispatch();

	useEffect(() => {
		if (activeCalculation) {
			setCalculationName(activeCalculation?.name);
		}
	}, [activeCalculation, modalOpen]);

	useEffect(() => {
		document.addEventListener('click', closeOnOutsideClick);
		document.addEventListener('keydown', closeWithEsc);

		return () => {
			document.removeEventListener('click', closeOnOutsideClick);
			document.removeEventListener('keydown', closeWithEsc);
		};
	}, []);

	useEffect(() => {
		if (modalOpen) {
			calculationNameRef.current.focus();
		}
	}, [modalOpen]);

	const calculationNameRef = useRef();

	const clearInpur = () => {
		setCalculationName('');
		calculationNameRef.current.focus();
	};

	const closeModal = () => {
		setModalOpen(false);
		setCalculationName('');
	};

	const handleSave = () => {
		const data = {
			_id: activeCalculation._id,
			name: calculationName,
		};

		// Check for empty names
		if (calculationName.trim().length === 0) {
			toast.error('Please provide a name for your calculation');
			return;
		}
		// Update existing active calculation only if name has changed
		if (calculationName.trim() !== activeCalculation.name) {
			dispatch(renameCalculation(data));
		}
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
			setCalculationName('');
		}
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
					<h2>Rename Your Calculation</h2>
				</div>
				<div className="modal-body">
					<div className="form-group">
						<label htmlFor="calculation-name">Calculation name</label>
						<input
							tabIndex={`${modalOpen ? 0 : -1}`}
							id="calculation-name"
							className="form-control icon-input"
							placeholder="Calculation name"
							maxLength="30"
							autoComplete="false"
							type="text"
							name="calculation-name"
							value={calculationName}
							ref={calculationNameRef}
							onChange={(e) => setCalculationName(e.target.value)}
						/>
						{calculationName && (
							<div
								tabIndex={`${modalOpen ? 0 : -1}`}
								className="input-icon-wrapper clear"
								onClick={clearInpur}
								onKeyDown={(e) => checkKeyDown(e, clearInpur())}
							>
								<RiCloseLine />
							</div>
						)}
					</div>
				</div>
				<div className="modal-footer">
					<button
						tabIndex={`${modalOpen ? 0 : -1}`}
						className="btn btn-block btn-secondary"
						onClick={closeModal}
						onKeyDown={(e) => checkKeyDown(e, closeModal())}
					>
						Cancel
					</button>
					<button
						tabIndex={`${modalOpen ? 0 : -1}`}
						className="btn btn-block"
						onClick={handleSave}
						onKeyDown={(e) => checkKeyDown(e, handleSave())}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default CompoundInterestRenameModal;
