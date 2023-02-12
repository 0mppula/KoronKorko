import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import { reset } from '../../features/ARC/annualizedReturnCalculatorSlice';
import { durationMultipliers } from '../../assets/data';
import Spinner from '../../components/Loading/Loading';
import PageHeading from '../../components/PageHeading/PageHeading';
import AnnualizedReturnForm from '../../components/AnnualizedReturnCalculator/AnnualizedReturnForm';
import AnnualizedReturnReport from '../../components/AnnualizedReturnCalculator/AnnualizedReturnReport';
import BackButton from '../../components/BackButton/BackButton';
import useErrorSuccessAlerts from '../../hooks/useErrorSuccessAlerts';
import useInitializeActiveCalculation from '../../hooks/useInitializeActiveCalculation';

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

			<PageHeading heading="Annualized Return Calculator" />

			<BackButton url="/home" />
			<AnnualizedReturnForm
				user={user}
				formData={formData}
				setFormData={setFormData}
				formErrors={formErrors}
				setFormErrors={setFormErrors}
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
