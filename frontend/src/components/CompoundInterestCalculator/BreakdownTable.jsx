import React from 'react';
import { formatCurrency } from '../../helpers/format';

const BreakdownTable = ({ data, breakdown, currency }) => {
	const { depositting } = data;

	console.log(data);

	let totalContribs = 0;
	let totalInterest = 0;
	let principal = data['datasets'][0].data[0];

	return (
		<table>
			<thead>
				<tr>
					<th>{`${breakdown === 'yearly' ? 'Year' : 'Month'}`}</th>
					<th>{`${depositting ? 'Deposits' : 'Withdrawals'}`}</th>
					<th>{`Total ${depositting ? 'Deposits' : 'Withdrawals'}`}</th>
					<th>Interest</th>
					<th>Total Interest</th>
					<th>Balance</th>
				</tr>
			</thead>
			<tbody>
				{data.labels.map((month, i) => {
					const first = i === 0;
					// when depositting the deposits arrau is indexed at 2 in the data sets array
					const contribsIndex = depositting ? 1 : 2;

					const contribs = first
						? data['datasets'][contribsIndex].data[i]
						: data['datasets'][contribsIndex].data[i] -
						  data['datasets'][contribsIndex].data[i - 1];

					totalContribs += contribs;

					const interest = first
						? data.totalAbsInterest[i]
						: data.totalAbsInterest[i] - data.totalAbsInterest[i - 1];
            
					totalInterest = data.totalAbsInterest[i];

					const balance = totalInterest + totalContribs + principal;

					return (
						<tr key={`date-${i}`}>
							<td>{i}</td>
							<td>{formatCurrency(contribs, currency.locale, currency.value)}</td>
							<td>
								{formatCurrency(totalContribs, currency.locale, currency.value)}
							</td>
							<td>{formatCurrency(interest, currency.locale, currency.value)}</td>
							<td>
								{formatCurrency(
									totalInterest,
									currency.locale,
									currency.value
								)}
							</td>
							<td>{formatCurrency(balance, currency.locale, currency.value)}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default BreakdownTable;
