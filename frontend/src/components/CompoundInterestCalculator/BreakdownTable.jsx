import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../helpers/format';

const BreakdownTable = ({ data, breakdown, currency }) => {
	const [tableData, setTableData] = useState(null);
	const [loading, setLoading] = useState(true);
	const { depositting } = data;

	useEffect(() => {
		const get = async () => {
			setLoading(true);

			setLoading(false);
		};

		get();
		// eslint-disable-next-line
	}, [data]);

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
					<td />
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
							<tr key={`table-margin-top-${i}`} className="table-margin-top" />
							<tr key={`table-item-${i}`} className="table-item">
								<td key={`td-${i}-0`}>{i}</td>
								<td key={`td-${i}-1`} className={`${contribs < 0 ? 'danger' : ''}`}>
									{formatCurrency(contribs, currency.locale, currency.value)}
								</td>
								<td key={`td-${i}-2`} className={`${interest < 0 ? 'danger' : ''}`}>
									{formatCurrency(interest, currency.locale, currency.value)}
								</td>
								<td
									key={`td-${i}-3`}
									className={`${totalContribs < 0 ? 'danger' : ''}`}
								>
									{formatCurrency(totalContribs, currency.locale, currency.value)}
								</td>
								<td
									key={`td-${i}-4`}
									className={`${totalInterest < 0 ? 'danger' : ''}`}
								>
									{formatCurrency(totalInterest, currency.locale, currency.value)}
								</td>
								<td key={`td-${i}-5`} className={`${balance < 0 ? 'danger' : ''}`}>
									{formatCurrency(balance, currency.locale, currency.value)}
								</td>
								<td key={`td-${i}-6`} className="border-bottom" />
							</tr>
						</>
					);
				})}
			</tbody>
		</table>
	);
};

export default BreakdownTable;
