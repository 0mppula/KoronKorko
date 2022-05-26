import React, { useRef, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';

const CompoundInterestSaveModal = ({
	modalOpen,
	setModalOpen,
	calculationName,
	setCalculationName,
	save,
}) => {
	useEffect(() => {
		let handler = (e) => {
			const modalOverlayClass = 'compound-interest-modal-overlay';
			if (e.target.classList.contains(modalOverlayClass)) {
				setModalOpen(false);
        setCalculationName('')
			}
		};

		modalOpen && document.addEventListener('click', handler);

		return () => {
			document.removeEventListener('click', handler);
		};
	});

	const calculationNameRef = useRef();

	const clearInpur = () => {
		setCalculationName('');
		calculationNameRef.current.focus();
	};

	const handleCancel = () => {
		setModalOpen(false);
		setCalculationName('');
	};

	const handleSave = () => {
		setModalOpen(false);
		save();
	};

	return (
		<div className={`compound-interest-modal-overlay ${modalOpen ? 'show' : ''}`}>
			<div className="compound-interest-modal">
				<div
					tabIndex={`${modalOpen ? 0 : -1}`}
					className="close-container"
					onClick={() => setModalOpen(false)}
				>
					<RiCloseLine />
				</div>
				<div className="modal-header">
					<h2>Save Your Calculation</h2>
				</div>
				<div className="modal-body">
					<div className="form-group">
						<label htmlFor="calculation-name">Calculation name</label>
						<input
							id="calculation-name"
							className="form-control icon-input"
							placeholder="Calculation name"
							autoComplete="false"
							type="text"
							name="calculation-name"
							value={calculationName}
							ref={calculationNameRef}
							onChange={(e) => setCalculationName(e.target.value)}
						/>
						{calculationName && (
							<div
								tabIndex={0}
								className="input-icon-wrapper clear"
								onClick={clearInpur}
							>
								<RiCloseLine />
							</div>
						)}
					</div>
				</div>
				<div className="modal-footer">
					<button className="btn btn-block btn-secondary" onClick={handleCancel}>
						Cancel
					</button>
					<button className="btn btn-block" onClick={handleSave}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default CompoundInterestSaveModal;
