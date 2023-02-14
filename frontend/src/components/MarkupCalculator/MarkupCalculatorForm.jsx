import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import FormGroup from '../FormComponents/FormGroup';
import BalanceInput from '../FormComponents/BalanceInput';
import CurrencySelector from '../FormComponents/CurrencySelector';
import CalculateButton from '../FormComponents/CalculateButton';
import FormControlsTop from '../FormComponents/FormControlsTop';
import ImportCalculationModal from '../Modals/ImportCalculationModal';
import SaveCalculationModal from '../Modals/SaveCalculationModal';
import RenameCalculationModal from '../Modals/RenameCalculationModal';
import {
	closeCalculation,
	deleteCalculation,
	getCalculation,
	getCalculations,
	updateCalculation,
	createCalculation,
	renameCalculation,
} from '../../features/markupCalculator/markupCalculatorSlice';

const MarkupCalculatorForm = ({
	user,
	formData,
	setFormData,
	formErrors,
	setFormErrors,
	setReport,
	setCalculationCount,
	setActiveCalculationId,
}) => {
	const [calculationName, setCalculationName] = useState('');
	const [saveModalOpen, setSaveModalOpen] = useState(false);
	const [importModalOpen, setImportModalOpen] = useState(false);
	const [renameModalOpen, setRenameModalOpen] = useState(false);

	const { activeCalculation, calculations, isLoading } = useSelector(
		(state) => state.markupCalculations
	);

	const dispatch = useDispatch();
	const { cost, salesPrice } = formData || {};

	const handleCalculation = (e) => {
		e.preventDefault();

		if (formValidated()) {
			// markup = profit / (cost * 100)
			const profit = salesPrice - cost;
			const markup = (profit / cost) * 100;

			setReport({ profit, markup });

			setCalculationCount((prev) => prev + 1);
		} else {
			toast.error('Incorrect field values');
		}
	};

	const formValidated = () => {
		const requiredFields = [cost, salesPrice];
		const requiredFieldLabels = ['cost', 'salesPrice'];
		const errors = { ...formErrors };

		requiredFields.forEach((rf, i) => {
			const notNumberAndEmpty = !(!isNaN(rf) && rf !== '');
			errors[requiredFieldLabels[i]] = notNumberAndEmpty;
			setFormErrors(errors);
		});

		// Check that all the required fields are numbers and not empty values
		return requiredFields.every((rf) => {
			const numberAndNotEmpty = !isNaN(rf) && rf !== '';
			return numberAndNotEmpty;
		});
	};

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const resetCalculator = () => {
		const errors = { ...formErrors };

		setFormData({
			cost: '',
			salesPrice: '',
		});

		// Reset all form errors
		for (const field in errors) {
			errors[field] = false;
		}

		setFormErrors(errors);
		setReport(null);

		toast.success('Form cleared');
	};

	const closeAndResetCalculation = () => {
		setFormData({
			cost: '',
			salesPrice: '',
		});

		setReport(null);
		setActiveCalculationId(null);
		setCalculationName('');
	};

	const openSaveModal = () => {
		if (user) {
			if (formValidated()) {
				if (!activeCalculation) {
					// Prompt user to name the calculation
					setSaveModalOpen(true);
				} else {
					const data = {
						_id: activeCalculation._id,
						name: calculationName,
						formData,
					};

					// Update excisting active calculation
					dispatch(updateCalculation(data));
					setCalculationName('');
				}
			} else {
				toast.error('Incorrect field values');
			}
		} else {
			toast.error('Please login to save calculation');
		}
	};

	const openRenameModal = () => {
		setRenameModalOpen(true);
	};

	const openImportModal = () => {
		if (user) {
			setImportModalOpen(true);
		} else {
			toast.error('Please login to load a calculation');
		}
	};

	const closeActiveCalculation = () => {
		dispatch(closeCalculation());
		closeAndResetCalculation();
	};

	return (
		<div className="form">
			<SaveCalculationModal
				modalOpen={saveModalOpen}
				setModalOpen={setSaveModalOpen}
				calculationName={calculationName}
				formData={formData}
				setCalculationName={setCalculationName}
				createCalculation={createCalculation}
			/>

			<ImportCalculationModal
				modalOpen={importModalOpen}
				setModalOpen={setImportModalOpen}
				calculations={calculations}
				getCalculation={getCalculation}
				getCalculations={getCalculations}
				deleteCalculation={deleteCalculation}
				setActiveCalculationId={setActiveCalculationId}
				isLoading={isLoading}
			/>

			<RenameCalculationModal
				modalOpen={renameModalOpen}
				setModalOpen={setRenameModalOpen}
				activeCalculation={activeCalculation}
				renameCalculation={renameCalculation}
				calculationName={calculationName}
				setCalculationName={setCalculationName}
			/>

			<FormControlsTop
				activeCalculation={activeCalculation}
				openRenameModal={openRenameModal}
				closeActiveCalculation={closeActiveCalculation}
				openImportModal={openImportModal}
				openSaveModal={openSaveModal}
				resetForm={resetCalculator}
			/>

			<form onSubmit={handleCalculation}>
				<FormGroup>
					{/* Cost */}
					<BalanceInput
						balance={cost}
						error={formErrors.cost}
						handleChange={handleChange}
						label="Cost"
						name="cost"
						placeholder="Cost to produce your product"
					/>

					{/* Sales prices */}
					<BalanceInput
						balance={salesPrice}
						error={formErrors.salesPrice}
						handleChange={handleChange}
						label="Sales Price"
						name="salesPrice"
						placeholder="Sales price of your product"
					/>
				</FormGroup>

				<FormGroup>
					<CurrencySelector />
				</FormGroup>

				<CalculateButton />
			</form>
		</div>
	);
};

export default MarkupCalculatorForm;
