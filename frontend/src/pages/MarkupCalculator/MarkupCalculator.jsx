import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import PageHeading from '../../components/PageHeading/PageHeading';
import MarkupCalculatorForm from '../../components/MarkupCalculator/MarkupCalculatorForm';
import MarkupCalculatorReport from '../../components/MarkupCalculator/MarkupCalculatorReport';
import useErrorSuccessAlerts from '../../hooks/useErrorSuccessAlerts';
import useInitializeActiveCalculation from '../../hooks/useInitializeActiveCalculation';
import { reset } from '../../features/markupCalculator/markupCalculatorSlice';

const MarkupCalculator = () => {
	useTitle('Markup Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);
	const {
		activeCalculation,
		isError,
		isSuccess,
		isLoading: calculationLoading,
		message,
	} = useSelector((state) => state.markupCalculations);

	const [report, setReport] = useState(null);
	const [activeCalculationId, setActiveCalculationId] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [formData, setFormData] = useState({
		cost: '',
		salesPrice: '',
	});
	const [formErrors, setFormErrors] = useState({
		cost: false,
		salesPrice: false,
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

			<PageHeading heading="Markup Calculator" />

			<BackButton url="/home" />
			<MarkupCalculatorForm
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
				<MarkupCalculatorReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default MarkupCalculator;
