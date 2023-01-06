import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import { durationMultipliers } from '../../assets/data';
import Spinner from '../../components/Loading/Loading';
import { currencies } from '../../assets/data';
import PageHeading from '../../components/PageHeading/PageHeading';
import AnnualizedReturnForm from '../../components/AnnualizedReturnCalculator/AnnualizedReturnForm';
import AnnualizedReturnReport from '../../components/AnnualizedReturnCalculator/AnnualizedReturnReport';
import BackButton from '../../components/BackButton/BackButton';

const AnnualizedReturnCalculator = () => {
	useTitle('Annualized Return Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);

	const [report, setReport] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [formData, setFormData] = useState({
		startingBalance: '',
		endingBalance: '',
		duration: '',
		durationMultiplier: durationMultipliers[0],
	});
	const [formErrors, setFormErrors] = useState({
		startingBalance: false,
		endingBalance: false,
		duration: false,
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

			<PageHeading heading="Annualized Return Calculator" />

			<BackButton url="/home" />
			<AnnualizedReturnForm
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
				<AnnualizedReturnReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default AnnualizedReturnCalculator;
