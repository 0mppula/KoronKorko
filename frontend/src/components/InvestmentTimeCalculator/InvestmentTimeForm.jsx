import React from 'react';
import { toast } from 'react-toastify';

import { FaSyncAlt } from 'react-icons/fa';
import checkKeyDown from '../../helpers/checkKeyDown';
import BalanceInput from '../FormComponents/BalanceInput';
import RateInput from '../FormComponents/RateInput';
import CalculateButton from '../FormComponents/CalculateButton';

const InvestmentTimeForm = ({
	formData,
	setFormData,
	formErrors,
	setFormErrors,
	setReport,
	setCalculationCount,
}) => {
	const { startingBalance, endingBalance, interestRate } = formData;

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
				{/* Starting */}
				<BalanceInput
					key="starting-balance-input"
					balanceFieldName="startingBalance"
					balance={startingBalance}
					error={formErrors.startingBalance}
					handleChange={handleChange}
					balanceLabel="Starting Value"
					balanceFieldPlaceholder="Starting value"
					showCurrency={false}
				/>

				<BalanceInput
					key="ending-balance-input"
					balanceFieldName="endingBalance"
					balance={endingBalance}
					error={formErrors.endingBalance}
					handleChange={handleChange}
					balanceLabel="Future Value"
					balanceFieldPlaceholder="Future value"
					showCurrency={false}
				/>

				<RateInput
					rate={interestRate}
					handleChange={handleChange}
					error={formErrors.interestRate}
					showInterval={false}
					rateFieldPlaceholder="Annual interest rate"
				/>

				<CalculateButton />
			</form>
		</div>
	);
};

export default InvestmentTimeForm;
