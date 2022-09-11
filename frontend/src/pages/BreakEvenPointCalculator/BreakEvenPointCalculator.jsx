import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import { currencies } from '../../assets/data';
import PageHeading from '../../components/PageHeading/PageHeading';
import BreakEvenPointForm from '../../components/BreakEvenPointCalculator/BreakEvenPointForm';
import BreakEvenPointFormReport from '../../components/BreakEvenPointCalculator/BreakEvenPointFormReport';

const BreakEvenPointCalculator = () => {
	useTitle('Break Even Point Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);
	const [report, setReport] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [formData, setFormData] = useState({
		fixedCosts: '',
    pricePerUnit: '',
    variableCostsPerUnit: '',
	});
	const [formErrors, setFormErrors] = useState({
		fixedCosts: false,
    pricePerUnit: false,
    variableCostsPerUnit: false,
	});
	const [currency, setCurrency] = useState(
		JSON.parse(localStorage.getItem('currency')) || currencies[0]
	);

	useEffect(() => {
		if (user) {
			// Update the currency if user is logged in
			setCurrency(user?.preferences.currency);
		}
	}, [user]);

	return (
		<>
			{isLoading && <Spinner />}

			<PageHeading heading="Break Even Point Calculator" />

			<BackButton url="/home" />
			<BreakEvenPointForm
				formData={formData}
				setFormData={setFormData}
				formErrors={formErrors}
				setFormErrors={setFormErrors}
				currency={currency}
				setCurrency={setCurrency}
				setReport={setReport}
				setCalculationCount={setCalculationCount}
			/>

			{report && (
				<BreakEvenPointFormReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default BreakEvenPointCalculator;
