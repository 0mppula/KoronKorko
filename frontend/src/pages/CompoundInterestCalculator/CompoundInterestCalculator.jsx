import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CompoundInterestReport from '../../components/CompoundInterestCalculator/CompoundInterestReport';
import {
	durationMultipliers,
	currencies,
	contributionFrequencies,
	compoundFrequencies,
} from '../../assets/data';
import { useTitle } from '../../hooks/useTitle';
import { reset } from '../../features/compoundInterestCalculator/compoundInterestCalculatorSlice';
import Spinner from '../../components/Loading/Loading';
import PageHeading from '../../components/PageHeading/PageHeading';
import CompoundInterestForm from '../../components/CompoundInterestCalculator/CompoundInterestForm';
import CompoundInterestBreakdown from '../../components/CompoundInterestCalculator/breakdown/CompoundInterestBreakdown';
import BackButton from '../../components/BackButton/BackButton';
import useErrorSuccessAlerts from '../../hooks/useErrorSuccessAlerts';
import useInitializeActiveCalculation from '../../hooks/useInitializeActiveCalculation';

const CompoundInterestCalculator = () => {
	useTitle('Compound Interest Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);
	const {
		activeCalculation,
		isError,
		isSuccess,
		isLoading: calculationLoading,
		message,
	} = useSelector((state) => state.compoundInterestCalculations);

	const [formData, setFormData] = useState({
		startingBalance: '',
		interestRate: '',
		compoundFrequency: compoundFrequencies[1],
		duration: '',
		durationMultiplier: durationMultipliers[0],
		contribution: '',
		contributionMultiplier: 1 /* depositting or withdrawing */,
		contributionFrequency: contributionFrequencies[1],
	});
	const [formErrors, setFormErrors] = useState({
		startingBalance: false,
		interestRate: false,
		duration: false,
	});
	const [currency, setCurrency] = useState(
		JSON.parse(localStorage.getItem('currency')) || currencies[0]
	);
	const [report, setReport] = useState(null);
	const [activeCalculationId, setActiveCalculationId] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [loadingCalculation, setLoadingCalculation] = useState(false);

	const dispatch = useDispatch();
	useErrorSuccessAlerts(isError, isSuccess, message);
	useInitializeActiveCalculation(
		activeCalculation,
		activeCalculationId,
		setFormData,
		setActiveCalculationId
	);

	useEffect(() => {
		if (user) {
			// Update the currency if user is logged in
			setCurrency(user?.preferences.currency);
		}
	}, [user]);

	useEffect(() => {
		// Close active calculation when navigating out of page
		return () => dispatch(reset());
	}, []);

	return (
		<>
			{(isLoading || calculationLoading) && <Spinner />}
			<PageHeading heading="Compound Interest Calculator" />

			<BackButton url="/home" />
			<CompoundInterestForm
				user={user}
				formData={formData}
				setFormData={setFormData}
				formErrors={formErrors}
				setFormErrors={setFormErrors}
				setReport={setReport}
				currency={currency}
				setCurrency={setCurrency}
				setCalculationCount={setCalculationCount}
				setLoadingCalculation={setLoadingCalculation}
				setActiveCalculationId={setActiveCalculationId}
			/>
			{report && (
				<CompoundInterestReport
					report={report}
					loadingCalculation={loadingCalculation}
					calculationCount={calculationCount}
				/>
			)}
			{report && (
				<CompoundInterestBreakdown
					user={user}
					formData={formData}
					report={report}
					setReport={setReport}
					loadingCalculation={loadingCalculation}
					setLoadingCalculation={setLoadingCalculation}
				/>
			)}
		</>
	);
};

export default CompoundInterestCalculator;
