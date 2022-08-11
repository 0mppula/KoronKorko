import React from 'react';
import { toast } from 'react-toastify';

import { FaSyncAlt } from 'react-icons/fa';
import checkKeyDown from '../../helpers/checkKeyDown';
import BalanceInput from '../FormComponents/BalanceInput';
import DurationInput from '../FormComponents/DurationInput';
import CalculateButton from '../FormComponents/CalculateButton';
import { durationMultipliers } from '../../assets/data';
import FormGroup from '../FormComponents/FormGroup';
import CurrencySelector from '../FormComponents/CurrencySelector';
import FormSelector from '../FormComponents/FormSelector';

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

	const resetCalculator = () => {
		const errors = { ...formErrors };

		setFormData({
			startingBalance: '',
			endingBalance: '',
			duration: '',
			durationMultiplier: durationMultipliers[0],
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
				<FormGroup>
					{/* Starting */}
					<BalanceInput
						balance={startingBalance}
						currency={currency}
						error={formErrors.startingBalance}
						handleChange={handleChange}
					/>

					{/* Ending */}
					<BalanceInput
						balance={endingBalance}
						currency={currency}
						error={formErrors.endingBalance}
						placeholder="Your Ending Balance"
						handleChange={handleChange}
						label="Ending Balance"
						name="endingBalance"
					/>
				</FormGroup>

				<FormGroup>
					<CurrencySelector currency={currency} setCurrency={setCurrency} />
				</FormGroup>

				<FormGroup>
					<DurationInput
						duration={duration}
						error={formErrors.duration}
						handleChange={handleChange}
					/>

					<FormSelector
						label="Duration Type"
						formField="durationMultiplier"
						value={durationMultiplier}
						setFormData={setFormData}
						options={durationMultipliers}
					/>
				</FormGroup>

				<CalculateButton />
			</form>
		</div>
	);
};

export default AnnualizedReturnForm;
