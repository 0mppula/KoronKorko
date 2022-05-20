const createChartData = (formData, darkMode) => {
	const {
		startingBalance,
		interestRate,
		compoundFrequency,
		duration,
		durationMultiplier,
		contribution,
		contributionMultiplier,
		contributionFrequency,
	} = formData;
	// Compounded Interest for Principal
	// CI = P(1 + r/n)^(nt)

	// Future Value of a Series
	// FV = PMT * (((1 + r / n) ** (n * t) - 1) / (r / n))

	// Total amount
	// T = CI + FV

	// Where:
	// PMT = addition freq / compound freq
	// CI = the future value of the investment/loan, including interest
	// P = Principal investment amount (the initial deposit or loan amount)
	// r = Annual interest rate (decimal)
	// n = Compound frequency per year
	// t = Investment time in years

	// time in months
	const tm = duration * durationMultiplier.value;

	const depositting = formData.contributionMultiplier > -1;

	// Arrays for chart
	const totalInterest = [];
	const totalAdditions = [];
	const totalPrincipal = [];
	const totalmonths = [];

	const PMT =
		contributionMultiplier *
		contribution *
		(contributionFrequency.value / compoundFrequency.value);
	const P = +startingBalance;
	const r = interestRate / 100;
	const n = compoundFrequency.value;

	// Decreasable pricipal for when depositting
	let p = +startingBalance;

	for (let i = 0; i <= tm; i++) {
		// Spread deposits/withdrawals evenly depending on deposits/withdrawals frequency
		let pmt = (contributionFrequency.value / 12) * (contributionMultiplier * contribution);
		let CI_i = P * (1 + r / n) ** (n * (i / 12));
		let FV_i = PMT * (((1 + r / n) ** (n * (i / 12)) - 1) / (r / n));
		let T_i = CI_i + FV_i;

		const additions = i * pmt;
		const interest = T_i - (P + additions);
		const month = i;
		const principal = P;

		totalAdditions.push(additions);
		totalmonths.push(month);

		if (depositting) {
			totalPrincipal.push(principal);
			totalInterest.push(interest);
		} else {
			// Dont withdraw on first iteration
			if (i > 0) {
				p += pmt;
			}
			// when principal is depleted value is 0
			const offsetPrincipal = p > 0 ? p : 0;
			// The remainder value when principal is depleted
			const remainder = p + pmt > P ? 0 : p;

			// Dont show negative pricipal & skip first iteration
			totalPrincipal.push(p >= 0 ? p : 0);

			// Substract from interest when pricipal is depleted & skip first iteration
			totalInterest.push(i > 0 ? interest + remainder - offsetPrincipal : 0);
		}
	}

	const chartData = {
		labels: totalmonths,
		datasets: [
			{
				label: 'Total Principal',
				data: totalPrincipal,
				backgroundColor: `${darkMode ? '#363636' : '#c9c9c9'}`,
			},
			{
				label: `${depositting ? 'Total Deposits' : 'Total Withdrawals'}`,
				data: totalAdditions,
				backgroundColor: `${
					depositting
						? `${darkMode ? '#12cc2f' : '#096a19'}`
						: `${darkMode ? '#f96767' : '#ab141c'}`
				}`,
			},
			{
				label: 'Total Interest',
				data: totalInterest,
				backgroundColor: `${darkMode ? '#b69ed3' : '#68498d'}`,
			},
		],
	};

	return chartData;
};

export default createChartData;
