const calculateCompoundInterest = (formData) => {
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
	const APY = ((1 + r / n) ** n - 1) * 100;

	const additionalContributions =
		contributionMultiplier * contribution * contributionFrequency.value * t;

	const totalContribution = additionalContributions + P;
	const totalProfit = T - totalContribution;

	return {
		totalContribution,
		futureValue: T,
		totalProfit,
		totalReturn: APY,
		principal: P,
		additionalContributions,
	};
};

export default calculateCompoundInterest;
