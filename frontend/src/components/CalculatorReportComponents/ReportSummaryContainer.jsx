import React from 'react';

const ReportSummaryContainer = ({ loading, autoHeight, children }) => {
	return (
		<div
			className={`summary-container ${autoHeight ? 'auto-height' : ''} ${
				loading ? 'loading' : ''
			}`}
		>
			{children}
		</div>
	);
};

ReportSummaryContainer.defaultProps = {
	autoHeight: true,
};

export default ReportSummaryContainer;
