import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import BalanceInput from '../FormComponents/BalanceInput';
import PercentInput from '../FormComponents/PercentInput';
import CalculateButton from '../FormComponents/CalculateButton';
import FormGroup from '../FormComponents/FormGroup';
import CurrencySelector from '../FormComponents/CurrencySelector';
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
} from '../../features/investmentTimeCalculator/investmentTimeCalculatorSlice';

const InvestmentTimeForm = ({
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
		(state) => state.investmentTimeCalculations
	);

	const dispatch = useDispatch();
	const { startingBalance, endingBalance, interestRate } = formData || {};

	const handleCalculation = (e) => {
		e.preventDefault();

		if (formValidated()) {
			// T = lg(endingBalance / startingBalance) / lg(1 + r)
			const r = interestRate / 100;
			const T = Math.log(endingBalance / startingBalance) / Math.log(1 + r);

			setReport({ timeRequired: T });

			setCalculationCount((prev) => prev + 1);
		} else {
			if (interestRate !== '' && +interestRate === 0) {
				toast.error('The interest rate must be greater than 0%');
			} else {
				toast.error('Incorrect field values');
			}
		}
	};

	const formValidated = () => {
		const requiredFields = [startingBalance, endingBalance, interestRate];
		const requiredFieldLabels = ['startingBalance', 'endingBalance', 'interestRate'];
		const errors = { ...formErrors };

		requiredFields.forEach((rf, i) => {
			const notNumberAndEmpty = !(!isNaN(rf) && rf !== '');
			errors[requiredFieldLabels[i]] = notNumberAndEmpty;
			setFormErrors(errors);
		});

		if (+interestRate === 0) {
			errors.interestRate = true;
			return false;
		}

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
			startingBalance: '',
			endingBalance: '',
			interestRate: '',
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
			startingBalance: '',
			endingBalance: '',
			interestRate: '',
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
					{/* Starting */}
					<BalanceInput
						name="startingBalance"
						balance={startingBalance}
						error={formErrors.startingBalance}
						handleChange={handleChange}
						label="Starting Value"
						placeholder="Starting value"
					/>

					<BalanceInput
						name="endingBalance"
						balance={endingBalance}
						error={formErrors.endingBalance}
						handleChange={handleChange}
						label="Future Value"
						placeholder="Future value"
					/>
				</FormGroup>

				<FormGroup>
					<CurrencySelector />
				</FormGroup>

				<FormGroup>
					<PercentInput
						rate={interestRate}
						handleChange={handleChange}
						error={formErrors.interestRate}
						placeholder="Annual interest rate"
					/>
				</FormGroup>

				<CalculateButton />
			</form>
		</div>
	);
};

export default InvestmentTimeForm;
