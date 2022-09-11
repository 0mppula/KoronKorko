import React from 'react';
import { toast } from 'react-toastify';

import { FaSyncAlt } from 'react-icons/fa';
import checkKeyDown from '../../helpers/checkKeyDown';
import FormGroup from '../FormComponents/FormGroup';
import BalanceInput from '../FormComponents/BalanceInput';
import CurrencySelector from '../FormComponents/CurrencySelector';
import CalculateButton from '../FormComponents/CalculateButton';

const BreakEvenPointForm = ({
	formData,
	setFormData,
	formErrors,
	setFormErrors,
	currency,
	setCurrency,
	setReport,
	setCalculationCount,
}) => {
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

	return (
		<div className="form">
			<div className="form-controls-top">
				<div />
				<div
					tabIndex={0}
					className="icon danger"
					title="Reset calculator"
					onClick={resetCalculator}
					onKeyDown={(e) => checkKeyDown(e, resetCalculator)}
				>
					<FaSyncAlt />
				</div>
			</div>

			<form onSubmit={handleCalculation}>
				<FormGroup>
					{/* Fixed costs */}
					<BalanceInput
						balance={fixedCosts}
						currency={currency}
						error={formErrors.fixedCosts}
						handleChange={handleChange}
						label="Fixed Costs"
						name="fixedCosts"
						placeholder="Your Fixed Costs"
					/>

					<CurrencySelector currency={currency} setCurrency={setCurrency} />
				</FormGroup>

				<FormGroup>
					<BalanceInput
						balance={pricePerUnit}
						currency={currency}
						error={formErrors.pricePerUnit}
						handleChange={handleChange}
						label="Price Per Unit"
						name="pricePerUnit"
						placeholder="Your Sales Price Per Unit Sold"
					/>

					<BalanceInput
						balance={variableCostsPerUnit}
						currency={currency}
						error={formErrors.variableCostsPerUnit}
						handleChange={handleChange}
						label="Variable Costs Per Unit"
						name="variableCostsPerUnit"
						placeholder="Your Variable Costs Per Unit"
					/>
				</FormGroup>

				<CalculateButton />
			</form>
		</div>
	);
};

export default BreakEvenPointForm;
