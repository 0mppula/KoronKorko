export const formatCurrency = (value, locale = 'en-US', currency = 'usd') => {
	if (!isNaN(value)) {
		let formatted = new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
			maximumFractionDigits: 2,
		}).format(value);
		return formatted;
	} else {
		let formatted = new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
			maximumFractionDigits: 2,
		}).format(0);
		return formatted;
	}
};

export const formatPercentage = (value = 'asdas') => {
	let formatted = '0.00%';
	if (!isNaN(value)) {
		formatted = `${Number(value).toFixed(2)}%`;
	}
	return formatted;
};
