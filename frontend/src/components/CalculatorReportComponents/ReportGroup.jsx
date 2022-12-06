import React from 'react';

const ReportGroup = ({ header, value }) => {
	return (
		<div className="report-group">
			<h3>{header}</h3>
			<p>{value}</p>
		</div>
	);
};

export default ReportGroup;
