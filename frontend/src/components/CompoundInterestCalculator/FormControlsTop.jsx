import React from 'react';
import { FaSyncAlt, FaSave, FaFileImport } from 'react-icons/fa';

const FormControlsTop = ({ openSaveModal, setModalOpen, resetCalculator }) => {
	const openModal = () => {
		setModalOpen(true);
	};
	return (
		<div className="form-controls-top">
			<div className="icon success" onClick={openModal}>
				<FaFileImport />
			</div>
			<div className="icon success" onClick={openSaveModal}>
				<FaSave />
			</div>
			<div className="icon danger" onClick={resetCalculator}>
				<FaSyncAlt />
			</div>
		</div>
	);
};

export default FormControlsTop;
