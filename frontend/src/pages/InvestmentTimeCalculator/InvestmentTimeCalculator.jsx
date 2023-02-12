import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import PageHeading from '../../components/PageHeading/PageHeading';
import InvestmentTimeForm from '../../components/InvestmentTimeCalculator/InvestmentTimeForm';
import InvestmentTimeReport from '../../components/InvestmentTimeCalculator/InvestmentTimeReport';
import useErrorSuccessAlerts from '../../hooks/useErrorSuccessAlerts';
import useInitializeActiveCalculation from '../../hooks/useInitializeActiveCalculation';
import { reset } from '../../features/investmentTimeCalculator/investmentTimeCalculatorSlice';

const InvestmentTimeCalculator = () => {
	useTitle('Investment Time Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);
	const {
		activeCalculation,
		isError,
		isSuccess,
		isLoading: calculationLoading,
		message,
	} = useSelector((state) => state.investmentTimeCalculations);

	const [report, setReport] = useState(null);
	const [activeCalculationId, setActiveCalculationId] = useState(null);
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

	const dispatch = useDispatch();
	useErrorSuccessAlerts(isError, isSuccess, message);
	useInitializeActiveCalculation(
		activeCalculation,
		activeCalculationId,
		setFormData,
		setActiveCalculationId
	);

	useEffect(() => {
		// Close active calculation when navigating out of page
		return () => dispatch(reset());
	}, []);

	return (
		<>
			{(isLoading || calculationLoading) && <Spinner />}

			<PageHeading heading="Investment Time Calculator" />

			<BackButton url="/home" />

			<InvestmentTimeForm
				user={user}
				formData={formData}
				setFormData={setFormData}
				formErrors={formErrors}
				setFormErrors={setFormErrors}
				setReport={setReport}
				setCalculationCount={setCalculationCount}
				setActiveCalculationId={setActiveCalculationId}
			/>

			{report && <InvestmentTimeReport report={report} calculationCount={calculationCount} />}
		</>
	);
};

export default InvestmentTimeCalculator;
