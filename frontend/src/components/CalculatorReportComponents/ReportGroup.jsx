import React from 'react';

const ReportGroup = ({ header, value }) => {
	return (
		<div className="report-group">
			<h3>{header}</h3>
			<h4>{value}</h4>
		</div>
	);
};

export default ReportGroup;
