import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import CompoundInterestReport from '../../components/CompoundInterestCalculator/CompoundInterestReport';
import {
	durationMultipliers,
	currencies,
	contributionFrequencies,
	compoundFrequencies,
} from '../../assets/data';
import { useTitle } from '../../hooks/useTitle';
import Spinner from '../../components/Loading/Loading';
import CompoundInterestForm from '../../components/CompoundInterestCalculator/CompoundInterestForm';
import CompoundInterestBreakdown from '../../components/CompoundInterestCalculator/CompoundInterestBreakdown';
import './styles.css';

const CompoundInterestCalculator = ({ darkMode }) => {
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
	const [currency, setCurrency] = useState(
		JSON.parse(localStorage.getItem('currency')) || currencies[0]
	);
	const [report, setReport] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [loadingCalculation, setLoadingCalculation] = useState(false);

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
			setCurrency(user?.preferences.currency);
		}
	}, [user]);

	useEffect(() => {
		if (user && activeCalculation) {
			// If active calculation is present set it to state
			setFormData({ ...activeCalculation.formData });
		}

		if (user && !activeCalculation) {
			setFormData({
				startingBalance: 0,
				interestRate: 0,
				compoundFrequency: compoundFrequencies[1],
				duration: 0,
				durationMultiplier: durationMultipliers[0],
				contribution: 0,
				contributionMultiplier: 1 /* depositting or withdrawing */,
				contributionFrequency: contributionFrequencies[1],
			});
		}
	}, [activeCalculation, user]);

	return (
		<>
			{(isLoading || calculationLoading) && <Spinner />}
			<section className="heading">
				<h1>
					<span>C</span>ompound&nbsp;<span>I</span>nterest&nbsp;<span>C</span>alculator
				</h1>
			</section>

			<CompoundInterestForm
				user={user}
				formData={formData}
				setFormData={setFormData}
				setReport={setReport}
				currency={currency}
				setCurrency={setCurrency}
				setCalculationCount={setCalculationCount}
				setLoadingCalculation={setLoadingCalculation}
			/>
			{report && (
				<CompoundInterestReport
					report={report}
					setLoadingCalculation={setLoadingCalculation}
					loadingCalculation={loadingCalculation}
				/>
			)}
			{report && (
				<CompoundInterestBreakdown
					user={user}
					formData={formData}
					report={report}
					setReport={setReport}
					darkMode={darkMode}
					calculationCount={calculationCount}
					loadingCalculation={loadingCalculation}
					setLoadingCalculation={setLoadingCalculation}
				/>
			)}
		</>
	);
};

export default CompoundInterestCalculator;
