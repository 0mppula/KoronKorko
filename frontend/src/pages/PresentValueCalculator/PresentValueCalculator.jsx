import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import { currencies } from '../../assets/data';
import { durationMultipliers } from '../../assets/data';
import PresentValueForm from '../../components/PresentValueCalculator/PresentValueForm';
import PresentValueFormReport from '../../components/PresentValueCalculator/PresentValueFormReport';
import PageHeading from '../../components/PageHeading/PageHeading';

const PresentValueCalculator = () => {
	useTitle('Present Value Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);

	const [report, setReport] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [formData, setFormData] = useState({
		startingBalance: "",
		duration: "",
		durationMultiplier: durationMultipliers[0],
		discountRate: "",
	});
	const [formErrors, setFormErrors] = useState({
		startingBalance: false,
		duration: false,
		discountRate: false,
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

			<PageHeading heading="Present Value Calculator" />

			<BackButton url="/home" />
			<PresentValueForm
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
				<PresentValueFormReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default PresentValueCalculator;
