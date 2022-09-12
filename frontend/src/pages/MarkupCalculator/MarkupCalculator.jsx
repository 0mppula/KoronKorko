import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import { currencies } from '../../assets/data';
import PageHeading from '../../components/PageHeading/PageHeading';
import MarkupCalculatorForm from '../../components/MarkupCalculator/MarkupCalculatorForm';
import MarkupCalculatorReport from '../../components/MarkupCalculator/MarkupCalculatorReport';

const MarkupCalculator = () => {
	useTitle('Markup Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);
	const [report, setReport] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [formData, setFormData] = useState({
		cost: '',
		salesPrice: '',
	});
	const [formErrors, setFormErrors] = useState({
		cost: false,
		salesPrice: false,
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

			<PageHeading heading="Markup Calculator" />

			<BackButton url="/home" />
			<MarkupCalculatorForm
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
				<MarkupCalculatorReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default MarkupCalculator;
