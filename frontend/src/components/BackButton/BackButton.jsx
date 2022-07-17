import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import './styles.css';

const BackButton = ({ url }) => {
	return (
		<Link to={url} className="back-button">
			<div>
				<FaArrowLeft /> Calculators
			</div>
		</Link>
	);
};

export default BackButton;
