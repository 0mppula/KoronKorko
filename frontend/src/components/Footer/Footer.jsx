import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

import Link from './Link';
import Icon from './Icon';
import logo_dark from '../../assets/images/logo_dark.png';
import logo_light from '../../assets/images/logo_light.png';
import './styles.css';

const Footer = ({ darkMode }) => {
	const [year] = useState(new Date(Date.now()).getFullYear());

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
								url="https://omars-portfolio.netlify.app"
								text="Omar Kraidié Portfolio"
							/>
							<Link
								url="https://www.goodreads.com/review/list/135003326-0mppu?ref=nav_mybooks&shelf=programming"
								text="Programming Books"
							/>
							<Link url="https://coincaps.netlify.app/" text="Project: CoinCaps" />
							<Link
								url="https://csgo-weapons.netlify.app/"
								text="Project: CS:GO Weapons"
							/>
							<Link
								url="https://polishcow.netlify.app/"
								text="Project: Dancing Polish Cow"
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
					<Icon
						url="https://www.linkedin.com/in/omar-kraidi%C3%A9-b7a8141a8/"
						icon={<FaLinkedin />}
					/>
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
