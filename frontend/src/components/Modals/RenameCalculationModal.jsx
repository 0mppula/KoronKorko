import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RiCloseLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import checkKeyDown from '../../helpers/checkKeyDown';
import useCloseOnClickOutsideOrEsc from '../../hooks/useCloseOnClickOutsideOrEsc';
import useFocusTrap from '../../hooks/useFocusTrap';

const RenameCalculationModal = ({
	modalOpen,
	setModalOpen,
	activeCalculation,
	renameCalculation,
	calculationName,
	setCalculationName,
}) => {
	const dispatch = useDispatch();
	const calculationNameRef = useRef();
	const outerModalRef = useRef();
	const innerModalRef = useRef();

	useCloseOnClickOutsideOrEsc(innerModalRef, modalOpen, setModalOpen);
	useFocusTrap(outerModalRef, modalOpen);

	useEffect(() => {
		if (activeCalculation && modalOpen) {
			setCalculationName(activeCalculation?.name);
		}
	}, [activeCalculation, modalOpen]);

	useEffect(() => {
		if (modalOpen) {
			calculationNameRef.current.focus();
		}
	}, [modalOpen]);

	const clearInput = () => {
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

	return (
		<div
			className={`modal-overlay ${modalOpen ? 'show' : ''}`}
			aria-modal={modalOpen ? true : false}
			ref={outerModalRef}
		>
			<form
				className="calculator-modal"
				ref={innerModalRef}
				onSubmit={(e) => e.preventDefault()}
			>
				<button
					type="button"
					tabIndex={`${modalOpen ? 0 : -1}`}
					className="close-container"
					onClick={() => setModalOpen(false)}
					onKeyDown={(e) => checkKeyDown(e, () => setModalOpen(false))}
				>
					<RiCloseLine />
				</button>

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
								onClick={clearInput}
								onKeyDown={(e) => checkKeyDown(e, clearInput)}
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
						onKeyDown={(e) => checkKeyDown(e, closeModal)}
						type="button"
					>
						Cancel
					</button>
					<button
						tabIndex={`${modalOpen ? 0 : -1}`}
						className="btn btn-block"
						onClick={handleSave}
						onKeyDown={(e) => checkKeyDown(e, handleSave)}
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default RenameCalculationModal;
