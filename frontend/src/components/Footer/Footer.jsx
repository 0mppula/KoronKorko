import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import Link from './Link';
import Icon from './Icon';
import logo_dark from '../../assets/images/logo_dark.png';
import logo_light from '../../assets/images/logo_light.png';
import './styles.css';

const Footer = () => {
	const [year] = useState(new Date(Date.now()).getFullYear());
	const { darkMode } = useSelector((state) => state.theme);

	return (
		<div className="footer">
			<div className="footer-top">
				<div className="footer-brand-section">
					<div className="brand">
						<img
							className="footer-logo"
							src={darkMode ? logo_dark : logo_light}
							alt="logo"
						/>
						<h2>
							<span>K</span>oron<span>K</span>orko
						</h2>
					</div>
				</div>
				<div className="footer-links-container">
					<div className="footer-link-section">
						<div className="link-header">
							<h2>Technologies</h2>
						</div>
						<ul>
							<Link url="https://www.mongodb.com/" text="MongoDB" />
							<Link url="https://expressjs.com/" text="Express.js" />
							<Link url="https://reactjs.org/" text="React.js" />
							<Link url="https://nodejs.org/" text="Node.js" />
							<Link url="https://redux.js.org/" text="Redux.js" />
						</ul>
					</div>
					<div className="footer-link-section">
						<div className="link-header">
							<h2>Resources</h2>
						</div>
						<ul>
							<Link url="https://www.chartjs.org/" text="Chart.js" />
							<Link
								url="https://react-icons.github.io/react-icons/icons?name=fa"
								text="React Chartjs 2"
							/>
							<Link
								url="https://react-icons.github.io/react-icons/icons?name=fa"
								text="Font Awesome"
							/>
							<Link
								url="https://fkhadra.github.io/react-toastify/introduction"
								text="React-toastify"
							/>
							<Link url="https://react-select.com/home" text="React Select" />
						</ul>
					</div>
					<div className="footer-link-section">
						<div className="link-header">
							<h2>Developer</h2>
						</div>
						<ul>
							<Link
								url="https://www.omarkraidie.com/"
								text="Omar Kraidié Portfolio"
							/>
							<Link
								url="https://www.goodreads.com/review/list/135003326-0mppu?ref=nav_mybooks&shelf=programming"
								text="Technology Books"
							/>
							<Link url="https://coincaps.netlify.app/" text="Project: CoinCaps" />
							<Link
								url="https://wsb-tickers.netlify.app/"
								text="Project: WSB-Tickers"
							/>
						</ul>
					</div>
					<div className="footer-link-section">
						<div className="link-header">
							<h2>Other</h2>
						</div>
						<ul>
							<Link
								url="https://en.wikipedia.org/wiki/Compound_interest"
								text="Compound Interest (Wikipedia)"
							/>
							<Link url="https://www.investopedia.com/" text="Investopedia" />
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="footer-icons">
					<Icon url="https://github.com/0mppula" icon={<FaGithub />} />
					<Icon url="https://www.linkedin.com/in/omarkraidie/" icon={<FaLinkedin />} />
					<Icon url="https://twitter.com/OmarKraidie" icon={<FaTwitter />} />
					<Icon
						url="https://www.youtube.com/channel/UCdpM1SUen7ZxX2owolyIGyQ"
						icon={<FaYoutube />}
					/>
				</div>
				<p>Developed by Omar Kraidié.</p>
				<p>
					Copyright <span className="copyright">{year}&copy;</span> Lahti, Finland. All
					Rights Reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
