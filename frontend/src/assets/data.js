export const currencies = [
	{ name: 'dollar', value: 'usd', label: '$', locale: 'en-US' },
	{ name: 'euro', value: 'eur', label: '€', locale: 'fi-FI' },
	{ name: 'pound ', value: 'gbp', label: '£', locale: 'en-US' },
	{ name: 'yen', value: 'jpy', label: '¥', locale: 'en-US' },
	{ name: 'yen', value: 'inr', label: '₹', locale: 'en-US' },
];

export const durationMultipliers = [
	// The value represents the amount of months in given option
	{ value: 12, label: 'Years' },
	{ value: 3, label: 'Quarters' },
	{ value: 1, label: 'Months' },
];

export const contributionFrequencies = [
	// The value represents the contribution frequency per year in given option
	{ value: 1, label: 'Annualy' },
	{ value: 12, label: 'Monthly' },
];

export const compoundFrequencies = [
	// The value represents the compound frequency per year in given option
	{ value: 1, label: 'Annualy' },
	{ value: 12, label: 'Monthly' },
];
