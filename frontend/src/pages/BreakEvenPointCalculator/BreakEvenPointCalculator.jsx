import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import PageHeading from '../../components/PageHeading/PageHeading';
import BreakEvenPointForm from '../../components/BreakEvenPointCalculator/BreakEvenPointForm';
import BreakEvenPointFormReport from '../../components/BreakEvenPointCalculator/BreakEvenPointFormReport';

const BreakEvenPointCalculator = () => {
	useTitle('Break Even Point Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);
	const [report, setReport] = useState(null);
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

	return (
		<>
			{isLoading && <Spinner />}

			<PageHeading heading="Break Even Point Calculator" />

			<BackButton url="/home" />
			<BreakEvenPointForm
				formData={formData}
				setFormData={setFormData}
				formErrors={formErrors}
				setFormErrors={setFormErrors}
				setReport={setReport}
				setCalculationCount={setCalculationCount}
			/>

			{report && (
				<BreakEvenPointFormReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default BreakEvenPointCalculator;
