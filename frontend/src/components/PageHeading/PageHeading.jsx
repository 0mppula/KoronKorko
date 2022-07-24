import React from 'react';

const PageHeading = ({ heading, secondaryHeading, clamp=true }) => {
	const headingWords = heading.split(' ');

	return (
		<section className={`heading ${!clamp ? 'no-clamp' : ''}`}>
			<h1>
				{headingWords.map((hw, i) => (
					<>
						<span>{hw[0]}</span>
						{hw.slice(1)}
						{i !== headingWords.length - 1 && <>&nbsp;</>}
					</>
				))}
			</h1>

			{secondaryHeading && <p>{secondaryHeading}</p>}
		</section>
	);
};

PageHeading.defaultProps = {
	clamp: true,
	secondaryHeading: '',
};

export default PageHeading;
