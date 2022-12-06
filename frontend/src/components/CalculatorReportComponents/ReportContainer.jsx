import React from 'react';

const ReportContainer = ({ header, children }) => {
	return (
		<div className="report-container">
			<h2>
				<span>{header?.slice(0, 1)}</span>
				{header?.slice(1)}
			</h2>

			{children}
		</div>
	);
};

ReportContainer.defaultProps = {
	header: 'Summary',
};

export default ReportContainer;
