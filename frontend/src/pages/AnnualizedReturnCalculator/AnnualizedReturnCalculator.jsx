import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import { reset } from '../../features/AnnualizedReturnCalculator/annualizedReturnCalculatorSlice';
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
	const {
		activeCalculation,
		isError,
		isSuccess,
		isLoading: calculationLoading,
		message,
	} = useSelector((state) => state.annualizedReturnCalculations);

	const [report, setReport] = useState(null);
	const [activeCalculationId, setActiveCalculationId] = useState(null);
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
		// Dont reload active calculation on currency change
		if (user && activeCalculation && activeCalculationId !== activeCalculation?._id) {
			// If active calculation is present set it to state
			setActiveCalculationId(activeCalculation._id);
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

			<PageHeading heading="Annualized Return Calculator" />

			<BackButton url="/home" />
			<AnnualizedReturnForm
				user={user}
				formData={formData}
				setFormData={setFormData}
				formErrors={formErrors}
				setFormErrors={setFormErrors}
				currency={currency}
				setCurrency={setCurrency}
				setReport={setReport}
				setCalculationCount={setCalculationCount}
				setActiveCalculationId={setActiveCalculationId}
			/>

			{report && (
				<AnnualizedReturnReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default AnnualizedReturnCalculator;
