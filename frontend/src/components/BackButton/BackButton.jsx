import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import './styles.css';

const BackButton = ({ url }) => {
	return (
		<div className="back-button">
			<Link to={url}>
				<FaArrowLeft /> Calculators
			</Link>
		</div>
	);
};

export default BackButton;
