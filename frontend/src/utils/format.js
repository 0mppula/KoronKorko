export const formatCurrency = (value, locale, currency) => {
	let formatted;
	if (value) {
		formatted = new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
			maximumFractionDigits: 2,
		}).format(value);
		return formatted
	} else {
		return 'No currency  passed';
	}
};
