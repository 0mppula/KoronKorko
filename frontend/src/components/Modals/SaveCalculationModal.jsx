import React, { useRef, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import checkKeyDown from '../../helpers/checkKeyDown';

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
			name: calculationName,
			formData,
		};

		// Create a new calculation and set it as active
		dispatch(createCalculation(data));

		setCalculationName('');
		setModalOpen(false);
	};

	const closeWithEsc = (e) => {
		const key = e.key;
		key === 'Escape' && closeModal();
	};

	const closeOnOutsideClick = (e) => {
		const modalOverlayClass = 'modal-overlay';
		if (e.target.classList.contains(modalOverlayClass)) {
			setModalOpen(false);
			setCalculationName('');
		}
	};

	return (
		<div className={`modal-overlay ${modalOpen ? 'show' : ''}`}>
			<div className="compound-interest-modal">
				<button
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
								onKeyDown={(e) => checkKeyDown(e, clearInput())}
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

export default SaveCalculationModal;
