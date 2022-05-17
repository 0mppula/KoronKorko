import React, { useState, useEffect } from 'react';
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
import './styles.css';

const CompoundInterestCalculator = () => {
	useTitle('Compound Interest Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);

	const [formData, setFormData] = useState({
		startingBalance: '',
		interestRate: '',
		compoundFrequency: compoundFrequencies[0],
		duration: '',
		durationMultiplier: durationMultipliers[0],
		contribution: '',
		contributionMultiplier: 1 /* depositting or withdrawing */,
		contributionFrequency: contributionFrequencies[0],
	});
	const [currency, setCurrency] = useState(
		JSON.parse(localStorage.getItem('currency')) || currencies[0]
	);
	const [report, setReport] = useState({
		contribution: 0,
		futureValue: 0,
		totalProfit: 0,
		totalReturn: 0,
		principal: 0,
		additional: 0,
		currency: currency,
	});

	useEffect(() => {
		if (user) {
			setCurrency(user?.preferences.currency);
			setReport({ ...report, currency: user?.preferences.currency });
		}
	}, [user]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>
					<span>C</span>ompound&nbsp;<span>I</span>nterest&nbsp;<span>C</span>alculator
				</h1>
			</section>

			<CompoundInterestForm
				user={user}
				formData={formData}
				setFormData={setFormData}
				report={report}
				setReport={setReport}
				currency={currency}
				setCurrency={setCurrency}
			/>
			<CompoundInterestReport report={report} />
		</>
	);
};

export default CompoundInterestCalculator;
