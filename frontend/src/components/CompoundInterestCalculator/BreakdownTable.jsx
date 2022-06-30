import React from 'react';
import { formatCurrency } from '../../helpers/format';

const BreakdownTable = ({ data, breakdown, currency }) => {
	const { depositting } = data;

	let totalContribs = 0;
	let totalInterest = 0;
	let principal = data['datasets'][0].data[0];

	return (
		<table>
			<thead>
				<tr>
					<th>{`${breakdown === 'yearly' ? 'Year' : 'Month'}`}</th>
					<th>{`${depositting ? 'Deposits' : 'Withdrawals'}`}</th>
					<th>Interest</th>
					<th>{`Total ${depositting ? 'Deposits' : 'Withdrawals'}`}</th>
					<th>Total Interest</th>
					<th>Balance</th>
				</tr>
				<tr className="thead-margin-bottom">
					<td></td>
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
						<>
							<tr className="table-margin-top"></tr>
							<tr key={`date-${i}`} className="table-item">
								<td>{i}</td>
								<td className={`${contribs < 0 ? 'danger' : ''}`}>
									{formatCurrency(contribs, currency.locale, currency.value)}
								</td>
								<td className={`${interest < 0 ? 'danger' : ''}`}>
									{formatCurrency(interest, currency.locale, currency.value)}
								</td>
								<td className={`${totalContribs < 0 ? 'danger' : ''}`}>
									{formatCurrency(totalContribs, currency.locale, currency.value)}
								</td>
								<td className={`${totalInterest < 0 ? 'danger' : ''}`}>
									{formatCurrency(totalInterest, currency.locale, currency.value)}
								</td>
								<td className={`${balance < 0 ? 'danger' : ''}`}>
									{formatCurrency(balance, currency.locale, currency.value)}
								</td>
								<td className="border-bottom"></td>
							</tr>
						</>
					);
				})}
			</tbody>
		</table>
	);
};

export default BreakdownTable;
