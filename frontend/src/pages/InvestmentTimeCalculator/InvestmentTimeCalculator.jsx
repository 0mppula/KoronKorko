import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import { currencies } from '../../assets/data';
import PageHeading from '../../components/PageHeading/PageHeading';
import InvestmentTimeForm from '../../components/InvestmentTimeCalculator/InvestmentTimeForm';
import InvestmentTimeReport from '../../components/InvestmentTimeCalculator/InvestmentTimeReport';

const InvestmentTimeCalculator = () => {
	useTitle('Investment Time Calculator');
	const { isLoading } = useSelector((state) => state.auth);

	const [report, setReport] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [formData, setFormData] = useState({
		startingBalance: '',
		endingBalance: '',
		interestRate: '',
	});
	const [formErrors, setFormErrors] = useState({
		startingBalance: false,
		endingBalance: false,
		interestRate: false,
	});
	const [currency, setCurrency] = useState(
		JSON.parse(localStorage.getItem('currency')) || currencies[0]
	);

	return (
		<>
			{isLoading && <Spinner />}

			<PageHeading heading="Investment Time Calculator" />

			<BackButton url="/home" />

			<InvestmentTimeForm
				formData={formData}
				setFormData={setFormData}
				formErrors={formErrors}
				setFormErrors={setFormErrors}
				setReport={setReport}
				setCalculationCount={setCalculationCount}
				currency={currency}
				setCurrency={setCurrency}
			/>

			{report && <InvestmentTimeReport report={report} calculationCount={calculationCount} />}
		</>
	);
};

export default InvestmentTimeCalculator;
