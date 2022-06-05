const Icon = ({ url, icon }) => {
	return (
		<a href={url} target="_blank" rel="noopener noreferrer">
			{icon}
		</a>
	);
};

export default Icon;
