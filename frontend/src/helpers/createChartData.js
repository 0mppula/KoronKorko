const createChartData = (formData) => {
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

	const PMT =
		contributionMultiplier *
		contribution *
		(contributionFrequency.value / compoundFrequency.value);
	const P = +startingBalance;
	const r = interestRate / 100;
	const n = compoundFrequency.value;
	const t = (duration * durationMultiplier.value) / 12;

	const CI = P * (1 + r / n) ** (n * t);
	const FV = PMT * (((1 + r / n) ** (n * t) - 1) / (r / n));
	const T = CI + FV;

	for (let i = 0; i <= tm; i++) {
		let CI_i = P * (1 + r / n) ** (n * (i / 12));
		let FV_i = PMT * (((1 + r / n) ** (n * (i / 12)) - 1) / (r / n));
		let T_i = CI_i + FV_i;


		const interest = T_i - (P + i * PMT);
		console.log(interest);
		// totalInterest.push();
	}

	const totalPrincipal = [];
	const totalAdditions = [];
	const totalInterest = [];

	console.log(tm);
};

export default createChartData;
