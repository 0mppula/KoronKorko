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
import CompoundInterestBreakdown from '../../components/CompoundInterestCalculator/CompoundInterestBreakdown';
import './styles.css';

const CompoundInterestCalculator = () => {
	useTitle('Compound Interest Calculator');
	const { user, isLoading } = useSelector((state) => state.auth);

	const [formData, setFormData] = useState({
		startingBalance: 10000,
		interestRate: 10,
		compoundFrequency: compoundFrequencies[1],
		duration: 10,
		durationMultiplier: durationMultipliers[0],
		contribution: 250,
		contributionMultiplier: 1 /* depositting or withdrawing */,
		contributionFrequency: contributionFrequencies[1],
	});
	const [currency, setCurrency] = useState(
		JSON.parse(localStorage.getItem('currency')) || currencies[0]
	);
	// const [report, setReport] = useState(null);
	const [report, setReport] = useState({
		contribution: 0,
		futureValue: 0,
		totalProfit: 0,
		totalReturn: 0,
		principal: 0,
		additional: 0,
		currency: currency,
	});
	const [chartReport, setChartReport] = useState(null);

	useEffect(() => {
		if (user) {
			setCurrency(user?.preferences.currency);
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
				setReport={setReport}
				currency={currency}
				setCurrency={setCurrency}
				setChartReport={setChartReport}
			/>
			{report && <CompoundInterestReport report={report} />}
			{chartReport && <CompoundInterestBreakdown chartReport={chartReport} />}
		</>
	);
};

export default CompoundInterestCalculator;
