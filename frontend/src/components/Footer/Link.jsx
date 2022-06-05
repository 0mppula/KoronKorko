const Link = ({ url, text }) => {
	return (
		<li className="link-item">
			<a href={url} target="_blank" rel="noopener noreferrer">
				{text}
			</a>
		</li>
	);
};

export default Link;