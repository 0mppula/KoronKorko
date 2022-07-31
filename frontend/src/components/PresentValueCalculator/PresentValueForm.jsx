import React from 'react';
import { toast } from 'react-toastify';

import { FaSyncAlt } from 'react-icons/fa';
import checkKeyDown from '../../helpers/checkKeyDown';
import BalanceInput from '../FormComponents/BalanceInput';
import RateInput from '../FormComponents/RateInput';
import DurationInput from '../FormComponents/DurationInput';
import CalculateButton from '../FormComponents/CalculateButton';
import { durationMultipliers } from '../../assets/data';
import FormGroup from '../FormComponents/FormGroup';
import CurrencySelector from '../FormComponents/CurrencySelector';

const PresentValueCalculator = ({
	formData,
	setFormData,
	formErrors,
	setFormErrors,
	currency,
	setCurrency,
	setReport,
	setCalculationCount,
}) => {
	const { startingBalance, duration, discountRate, durationMultiplier } = formData;

	const handleCalculation = (e) => {
		e.preventDefault();

		if (formValidated()) {
			// PV = FV * (1 / (1 + r) ^ n)
			const FV = startingBalance;
			const r = discountRate / 100;
			const n = duration;
			const PV = FV * (1 / (1 + r) ** n);

			setReport({
				presentValue: PV,
				currency,
			});

			setCalculationCount((prev) => prev + 1);
		} else {
			toast.error('Incorrect field values');
		}
	};

	const formValidated = () => {
		const requiredFields = [startingBalance, duration, discountRate];
		const requiredFieldLabels = ['startingBalance', 'duration', 'discountRate'];
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
			startingBalance: '',
			duration: '',
			durationMultiplier: durationMultipliers[0],
			discountRate: '',
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
					{/* Starting */}
					<BalanceInput
						balance={startingBalance}
						currency={currency}
						error={formErrors.startingBalance}
						handleChange={handleChange}
						label="Future Value"
						placeholder="Your Future Value"
					/>

					<CurrencySelector currency={currency} setCurrency={setCurrency} />
				</FormGroup>

				<FormGroup>
					<DurationInput
						duration={duration}
						error={formErrors.duration}
						handleChange={handleChange}
						durationMultiplier={durationMultiplier}
						handleFormSelectChange={handleFormSelectChange}
					/>
				</FormGroup>

				<FormGroup>
					<RateInput
						rate={discountRate}
						handleChange={handleChange}
						handleFormSelectChange={handleFormSelectChange}
						error={formErrors.discountRate}
						label="Discount Rate"
						name="discountRate"
						placeholder="Your projected discount rate"
						showInterval={false}
					/>
				</FormGroup>

				<CalculateButton />
			</form>
		</div>
	);
};

export default PresentValueCalculator;
