import React, { useRef, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import checkKeyDown from '../../helpers/checkKeyDown';
import useCloseOnClickOutsideOrEsc from '../../hooks/useCloseOnClickOutsideOrEsc';
import useFocusTrap from '../../hooks/useFocusTrap';

const SaveCalculationModal = ({
	modalOpen,
	setModalOpen,
	calculationName,
	formData,
	setCalculationName,
	createCalculation,
}) => {
	const dispatch = useDispatch();
	const calculationNameRef = useRef();
	const outerModalRef = useRef();
	const innerModalRef = useRef();

	useCloseOnClickOutsideOrEsc(innerModalRef, modalOpen, setModalOpen);
	useFocusTrap(outerModalRef, modalOpen);

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
		// Check for empty names
		if (calculationName.trim().length === 0) {
			toast.error('Please provide a name for your calculation');
			return;
		}

		const data = {
			name: calculationName,
			formData,
		};

		// Create a new calculation and set it as active
		dispatch(createCalculation(data));

		setCalculationName('');
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
					<h2>Save Your Calculation</h2>
				</div>

				<div className="modal-body">
					<div className="form-group">
						<label htmlFor="calculation-name">Calculation name</label>
						<input
							tabIndex={`${modalOpen ? 0 : -1}`}
							id="calculation-name"
							className="form-control icon-input"
							placeholder="Calculation name"
							autoComplete="false"
							type="text"
							maxLength="30"
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
						type="button"
						tabIndex={`${modalOpen ? 0 : -1}`}
						className="btn btn-block btn-secondary"
						onClick={closeModal}
						onKeyDown={(e) => checkKeyDown(e, closeModal)}
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

export default SaveCalculationModal;
