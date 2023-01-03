import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { useTitle } from '../../hooks/useTitle';
import Spinner from '../../components/Loading/Loading';
import './styles.css';
import PageHeading from '../../components/PageHeading/PageHeading';

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
	{
		name: 'Markup Calculator',
		url: 'markup-calculator',
		description:
			'Calculate the difference between the cost and the selling price of your product.',
	},
];

const featuredApps = [
	{
		name: 'CoinCaps',
		url: 'https://coincaps.netlify.app/',
		description:
			'A web-application where the user can view the 1000 most valuable cryptocurrencies by market capitalization.',
	},
	{
		name: 'WSB-Tickers',
		url: 'https://wsb-tickers.netlify.app/',
		description:
			'App that displays the top 50 stocks discussed on reddit.com/r/wallstreetbets/',
	},
];

const Home = () => {
	useTitle('Home');
	const { isLoading } = useSelector((state) => state.auth);

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

			<div className="featured-apps-seperator">
				<div />
				<h2>Featured</h2>
				<div />
			</div>

			<div className="calculator-container">
				{featuredApps.map((app, i) => (
					<a
						key={`app-${i}`}
						className="calculator-card"
						href={`${app.url}`}
						rel="noreferrer"
						target="_blank"
					>
						<h2>{app.name}</h2>
						<div className="featured-app-icon-container">
							<FaExternalLinkAlt />
						</div>
						<hr />
						<p>{app.description}</p>
					</a>
				))}
			</div>
		</>
	);
};

export default Home;
