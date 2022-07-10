import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useTitle } from '../../hooks/useTitle';
import Spinner from '../../components/Loading/Loading';
import './styles.css';

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
				'Calculate the annualized return (CAGR) and the the total percent return of your investment with this calculator.',
		},
	];

	return (
		<>
			{isLoading && <Spinner />}
			<section className="heading authentication">
				<h1>
					<span>H</span>ome
				</h1>
				<p>Choose a Financial Calculator</p>
			</section>

			<div className="calculator-container">
				{calculators.map((calculator, i) => (
					<Link key={`calculator-${i}`} className="calculator-card" to={`/${calculator.url}`}>
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
