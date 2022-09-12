import React from 'react';
import { toast } from 'react-toastify';

import { FaSyncAlt } from 'react-icons/fa';
import checkKeyDown from '../../helpers/checkKeyDown';
import FormGroup from '../FormComponents/FormGroup';
import BalanceInput from '../FormComponents/BalanceInput';
import CurrencySelector from '../FormComponents/CurrencySelector';
import CalculateButton from '../FormComponents/CalculateButton';

const MarkupCalculatorForm = ({
	formData,
	setFormData,
	formErrors,
	setFormErrors,
	currency,
	setCurrency,
	setReport,
	setCalculationCount,
}) => {
	const { cost, salesPrice } = formData;

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
					{/* Cost */}
					<BalanceInput
						balance={cost}
						currency={currency}
						error={formErrors.cost}
						handleChange={handleChange}
						label="Cost"
						name="cost"
						placeholder="Cost to produce your product"
					/>

					{/* Sales prices */}
					<BalanceInput
						balance={salesPrice}
						currency={currency}
						error={formErrors.salesPrice}
						handleChange={handleChange}
						label="Sales Price"
						name="salesPrice"
						placeholder="Sales price of your product"
					/>
				</FormGroup>

				<FormGroup>
					<CurrencySelector currency={currency} setCurrency={setCurrency} />
				</FormGroup>

				<CalculateButton />
			</form>
		</div>
	);
};

export default MarkupCalculatorForm;
