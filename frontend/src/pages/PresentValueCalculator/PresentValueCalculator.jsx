import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import { durationMultipliers } from '../../assets/data';
import PresentValueForm from '../../components/PresentValueCalculator/PresentValueForm';
import PresentValueFormReport from '../../components/PresentValueCalculator/PresentValueFormReport';
import PageHeading from '../../components/PageHeading/PageHeading';
import useErrorSuccessAlerts from '../../hooks/useErrorSuccessAlerts';
import useInitializeActiveCalculation from '../../hooks/useInitializeActiveCalculation';
import { reset } from '../../features/presentValueCalculator/presentValueCalculatorSlice';

const PresentValueCalculator = () => {
	useTitle('Present Value Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);
	const {
		activeCalculation,
		isError,
		isSuccess,
		isLoading: calculationLoading,
		message,
	} = useSelector((state) => state.presentValueCalculations);

	const [report, setReport] = useState(null);
	const [activeCalculationId, setActiveCalculationId] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [formData, setFormData] = useState({
		startingBalance: '',
		duration: '',
		durationMultiplier: durationMultipliers[0],
		discountRate: '',
	});
	const [formErrors, setFormErrors] = useState({
		startingBalance: false,
		duration: false,
		discountRate: false,
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

			<PageHeading heading="Present Value Calculator" />

			<BackButton url="/home" />
			<PresentValueForm
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
				<PresentValueFormReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default PresentValueCalculator;
