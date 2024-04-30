import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { useTitle } from '../../hooks/useTitle';
import Spinner from '../../components/Loading/Loading';
import './styles.css';
import PageHeading from '../../components/PageHeading/PageHeading';
import { calculators } from './calculators';

const featuredApps = [
	{
		name: 'Money Mapper',
		url: 'https://moneymapper.vercel.app/',
		description:
			'An all-in-one personal finance tracker. Users can track and visualize their money, income, net worth, debts, and everything in between.',
	},
	{
		name: 'CoinCaps',
		url: 'https://coincaps.netlify.app/',
		description:
			'A web-application allowing the user to view the 250 most valuable cryptocurrencies by market capitalization.',
	},
	{
		name: 'KoronKorko (Remastered)',
		url: 'https://www.koronkorko.com/',
		description:
			'The remastered version of KoronKorko built with Next.js. It mirrors the current functionality, enabling users to utilize various financial calculators and save their results. However, the remastered version boasts slight improvements.',
	},
	{
		name: 'WSB-Tickers',
		url: 'https://wsb-tickers.netlify.app/',
		description:
			'View the sentiment of the top 50 stocks mentioned on reddit.com/r/wallstreetbets before the closing of its API on October 14, 2023.',
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
