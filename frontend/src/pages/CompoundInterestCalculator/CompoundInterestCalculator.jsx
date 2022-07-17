import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
import CompoundInterestForm from '../../components/CompoundInterestCalculator/CompoundInterestForm';
import CompoundInterestBreakdown from '../../components/CompoundInterestCalculator/breakdown/CompoundInterestBreakdown';
import BackButton from '../../components/BackButton/BackButton';

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
		startingBalance: 0,
		interestRate: 0,
		compoundFrequency: compoundFrequencies[1],
		duration: 0,
		durationMultiplier: durationMultipliers[0],
		contribution: 0,
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
	const [calculationCount, setCalculationCount] = useState(0);
	const [loadingCalculation, setLoadingCalculation] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError && message) {
			toast.error(message);
		}
	}, [isError, message]);

	useEffect(() => {
		if (isSuccess && !isError && message) {
			toast.success(message);
		}
	}, [isSuccess, message, isError]);

	useEffect(() => {
		if (user) {
			// Update the currency if user is logged in
			setCurrency(user?.preferences.currency);
		}
	}, [user]);

	useEffect(() => {
		if (user && activeCalculation) {
			// If active calculation is present set it to state
			setFormData({ ...activeCalculation.formData });
		}
	}, [activeCalculation, user]);

	useEffect(() => {
		// Close active calculation when navigating out of page
		return () => dispatch(reset());
	}, []);

	return (
		<>
			{(isLoading || calculationLoading) && <Spinner />}
			<section className="heading">
				<h1>
					<span>C</span>ompound&nbsp;<span>I</span>nterest&nbsp;<span>C</span>alculator
				</h1>
			</section>

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
			/>
			{report && (
				<CompoundInterestReport report={report} loadingCalculation={loadingCalculation} />
			)}
			{report && (
				<CompoundInterestBreakdown
					user={user}
					formData={formData}
					report={report}
					setReport={setReport}
					calculationCount={calculationCount}
					loadingCalculation={loadingCalculation}
					setLoadingCalculation={setLoadingCalculation}
				/>
			)}
		</>
	);
};

export default CompoundInterestCalculator;
