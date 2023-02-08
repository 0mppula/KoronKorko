import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from '../../components/Loading/Loading';
import { durationMultipliers } from '../../assets/data';
import PresentValueForm from '../../components/PresentValueCalculator/PresentValueForm';
import PresentValueFormReport from '../../components/PresentValueCalculator/PresentValueFormReport';
import PageHeading from '../../components/PageHeading/PageHeading';

const PresentValueCalculator = () => {
	useTitle('Present Value Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);

	const [report, setReport] = useState(null);
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

	return (
		<>
			{isLoading && <Spinner />}

			<PageHeading heading="Present Value Calculator" />

			<BackButton url="/home" />
			<PresentValueForm
				formData={formData}
				setFormData={setFormData}
				formErrors={formErrors}
				setFormErrors={setFormErrors}
				setReport={setReport}
				setCalculationCount={setCalculationCount}
			/>

			{report && (
				<PresentValueFormReport report={report} calculationCount={calculationCount} />
			)}
		</>
	);
};

export default PresentValueCalculator;
