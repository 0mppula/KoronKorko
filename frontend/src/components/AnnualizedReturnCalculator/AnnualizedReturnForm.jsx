import React from 'react';
import { toast } from 'react-toastify';

import { FaSyncAlt } from 'react-icons/fa';
import checkKeyDown from '../../helpers/checkKeyDown';
import BalanceInput from '../FormComponents/BalanceInput';
import DurationInput from '../FormComponents/DurationInput';
import CalculateButton from '../FormComponents/CalculateButton';
import { durationMultipliers } from '../../assets/data';

const AnnualizedReturnForm = ({
	formData,
	setFormData,
	formErrors,
	setFormErrors,
	currency,
	setCurrency,
	setReport,
	setCalculationCount,
}) => {
	const { startingBalance, endingBalance, duration, durationMultiplier } = formData;

	const handleCalculation = (e) => {
		e.preventDefault();

		if (formValidated()) {
			// Time in years
			const t = (duration * durationMultiplier.value) / 12;
			const annualizedReturn = ((endingBalance / startingBalance) ** (1 / t) - 1) * 100;
			const percentReturn = ((endingBalance - startingBalance) / startingBalance) * 100;

			setReport({
				startingBalance,
				endingBalance,
				annualizedReturn,
				percentReturn,
				currency,
			});

			setCalculationCount((prev) => prev + 1);
		} else {
			toast.error('Incorrect field values');
		}
	};

	const formValidated = () => {
		const requiredFields = [startingBalance, endingBalance, duration];
		const requiredFieldLabels = ['startingBalance', 'endingBalance', 'duration'];
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

	const handleFormSelectChange = (e, inputField) => {
		setFormData((prev) => ({ ...prev, [inputField]: e }));
	};

	const resetCalculator = () => {
		const errors = { ...formErrors };

		setFormData({
			startingBalance: 0,
			endingBalance: 0,
			duration: 0,
			durationMultiplier: durationMultipliers[0],
		});

		// Reset all form errors
		for (const field in errors) {
			errors[field] = false;
		}

		setFormErrors(errors)
		setReport(null);

		toast.success('Form cleared');
	};

	return (
		<div className="form">
			<div className="form-controls-top">
				<div />
				<div className="form-controls-icons">
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
			</div>

			<form onSubmit={handleCalculation}>
				{/* Starting */}
				<BalanceInput
					key="starting-balance-input"
					balance={startingBalance}
					error={formErrors.startingBalance}
					handleChange={handleChange}
					currency={currency}
					setCurrency={setCurrency}
				/>

				{/* Ending */}
				<BalanceInput
					key="ending-balance-input"
					balance={endingBalance}
					error={formErrors.endingBalance}
					handleChange={handleChange}
					currency={currency}
					setCurrency={setCurrency}
					balanceTitle="Ending Balance"
					balanceFieldName="endingBalance"
				/>

				<DurationInput
					duration={duration}
					error={formErrors.duration}
					handleChange={handleChange}
					durationMultiplier={durationMultiplier}
					handleFormSelectChange={handleFormSelectChange}
				/>

				<CalculateButton />
			</form>
		</div>
	);
};

export default AnnualizedReturnForm;
