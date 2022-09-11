import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import Spinner from '../../components/Loading/Loading';
import './styles.css';
import PageHeading from '../../components/PageHeading/PageHeading';

const Home = () => {
	useTitle('Home');
	const { isLoading } = useSelector((state) => state.auth);

	const calculators = [
		{
			name: 'Compound Interest Calculator',
			url: 'compound-interest-calculator',
			description:
				'Calculate the compound interest of your investment with this calculator. Additionally, logged in users can save their calculations.',
		},
		{
			name: 'Annualized Return Calculator',
			url: 'annualized-return-calculator',
			description:
				'Calculate the annualized return (CAGR) and or the the total percent return of your investment with this calculator.',
		},
		{
			name: 'Present Value Calculator',
			url: 'present-value-calculator',
			description:
				'Calculate the present value of your future investment with a specified discount rate with this calculator.',
		},
		{
			name: 'Investment Time Calculator',
			url: 'investment-time-calculator',
			description:
				'Calculate the amount of time needed to grow an investment to a certain future value given an annual interest rate.',
		},
		{
			name: 'Break Even Point Calculator',
			url: 'break-even-point-calculator',
			description:
				'Calculate the point at which total cost and total revenue are equal, meaning there is no loss or gain for your business.',
		},
	];

	return (
		<>
			{isLoading && <Spinner />}

			<PageHeading
				heading="Home"
				secondaryHeading="Choose a Financial Calculator"
				clamp={false}
			/>

			<div className="calculator-container">
				{calculators.map((calculator, i) => (
					<Link
						key={`calculator-${i}`}
						className="calculator-card"
						to={`/${calculator.url}`}
					>
						<div>
							<h2>{calculator.name}</h2>
							<hr />
							<p>{calculator.description}</p>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default Home;
