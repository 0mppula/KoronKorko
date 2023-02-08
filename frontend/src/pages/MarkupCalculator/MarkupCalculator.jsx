import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import PageHeading from '../../components/PageHeading/PageHeading';
import MarkupCalculatorForm from '../../components/MarkupCalculator/MarkupCalculatorForm';
import MarkupCalculatorReport from '../../components/MarkupCalculator/MarkupCalculatorReport';

const MarkupCalculator = () => {
	useTitle('Markup Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);
	const [report, setReport] = useState(null);
	const [calculationCount, setCalculationCount] = useState(0);
	const [formData, setFormData] = useState({
		cost: '',
		salesPrice: '',
	});
	const [formErrors, setFormErrors] = useState({
		cost: false,
		salesPrice: false,
	});

	return (
		<>
			{isLoading && <Spinner />}

			<PageHeading heading="Markup Calculator" />

			<BackButton url="/home" />
			<MarkupCalculatorForm
				formData={formData}
				setFormData={setFormData}
				formErrors={formErrors}
				setFormErrors={setFormErrors}
				setReport={setReport}
				setCalculationCount={setCalculationCount}
			/>

			{report && (
				<MarkupCalculatorReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default MarkupCalculator;
