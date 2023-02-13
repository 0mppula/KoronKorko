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
} from '../../features/breakEvenPointCalculator/breakEvenPointCalculatorSlice';

const BreakEvenPointForm = ({
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
		(state) => state.breakEvenPointCalculations
	);

	const dispatch = useDispatch();
	const { currency } = useSelector((state) => state.currency);
	const { fixedCosts, pricePerUnit, variableCostsPerUnit } = formData;

	const handleCalculation = (e) => {
		e.preventDefault();

		if (formValidated()) {
			// BEP = Fixed costs / (Sales price per unit – Variable cost per unit)
			const BEP = fixedCosts / (pricePerUnit - variableCostsPerUnit);
			// Break even point in currency
			const BEPM = BEP * pricePerUnit;

			// Contribution margin
			const CM = pricePerUnit - variableCostsPerUnit;
			const CMP = (CM / pricePerUnit) * 100;

			setReport({
				breakEvenPointUnits: BEP,
				breakEvenPointMoney: BEPM,
				contributionMarginMoney: CM,
				contributionMarginPercent: CMP,
				currency,
			});

			setCalculationCount((prev) => prev + 1);
		} else {
			toast.error('Incorrect field values');
		}
	};

	const formValidated = () => {
		const requiredFields = [fixedCosts, pricePerUnit, variableCostsPerUnit];
		const requiredFieldLabels = ['fixedCosts', 'pricePerUnit', 'variableCostsPerUnit'];
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
			fixedCosts: '',
			pricePerUnit: '',
			variableCostsPerUnit: '',
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
			fixedCosts: '',
			pricePerUnit: '',
			variableCostsPerUnit: '',
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
					{/* Fixed costs */}
					<BalanceInput
						balance={fixedCosts}
						error={formErrors.fixedCosts}
						handleChange={handleChange}
						label="Fixed Costs"
						name="fixedCosts"
						placeholder="Your fixed costs"
					/>

					<CurrencySelector />
				</FormGroup>

				<FormGroup>
					<BalanceInput
						balance={pricePerUnit}
						error={formErrors.pricePerUnit}
						handleChange={handleChange}
						label="Price Per Unit"
						name="pricePerUnit"
						placeholder="Your sales price per unit sold"
					/>

					<BalanceInput
						balance={variableCostsPerUnit}
						error={formErrors.variableCostsPerUnit}
						handleChange={handleChange}
						label="Variable Costs Per Unit"
						name="variableCostsPerUnit"
						placeholder="Your variable costs per unit"
					/>
				</FormGroup>

				<CalculateButton />
			</form>
		</div>
	);
};

export default BreakEvenPointForm;
