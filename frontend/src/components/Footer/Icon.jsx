const Icon = ({ url, ariaLabel, icon }) => {
	return (
		<a href={url} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
			{icon}
		</a>
	);
};

export default Icon;
