const disableArrowKeys = (e) => {
	if (e.which === 38 || e.which === 40) {
		e.preventDefault();
	}
};

export default disableArrowKeys;
