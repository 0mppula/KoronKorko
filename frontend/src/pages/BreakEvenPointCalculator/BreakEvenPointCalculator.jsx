import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import { reset } from '../../features/breakEvenPointCalculator/breakEvenPointCalculatorSlice';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import PageHeading from '../../components/PageHeading/PageHeading';
import BreakEvenPointForm from '../../components/BreakEvenPointCalculator/BreakEvenPointForm';
import BreakEvenPointFormReport from '../../components/BreakEvenPointCalculator/BreakEvenPointFormReport';
import useErrorSuccessAlerts from '../../hooks/useErrorSuccessAlerts';
import useInitializeActiveCalculation from '../../hooks/useInitializeActiveCalculation';

const BreakEvenPointCalculator = () => {
	useTitle('Break Even Point Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);
	const {
		activeCalculation,
		isError,
		isSuccess,
		isLoading: calculationLoading,
		message,
	} = useSelector((state) => state.breakEvenPointCalculations);

	const [report, setReport] = useState(null);
	const [activeCalculationId, setActiveCalculationId] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [formData, setFormData] = useState({
		fixedCosts: '',
		pricePerUnit: '',
		variableCostsPerUnit: '',
	});
	const [formErrors, setFormErrors] = useState({
		fixedCosts: false,
		pricePerUnit: false,
		variableCostsPerUnit: false,
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

			<PageHeading heading="Break Even Point Calculator" />

			<BackButton url="/home" />
			<BreakEvenPointForm
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
				<BreakEvenPointFormReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default BreakEvenPointCalculator;
