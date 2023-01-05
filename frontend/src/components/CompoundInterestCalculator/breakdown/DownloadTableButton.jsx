import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { FaFileDownload, FaCircleNotch } from 'react-icons/fa';

import { useSelector } from 'react-redux';

const DownloadTableButton = ({ data, breakdown, currency }) => {
	const [CSVData, setCSVData] = useState(null);
	const [loading, setLoading] = useState(true);
	const { depositting } = data;
	const { activeCalculation } = useSelector((state) => state.compoundInterestCalculations);

	useEffect(() => {
		const get = async () => {
			setLoading(true);
			const CSVDataArrays = await createData();
			setCSVData(CSVDataArrays);
			setLoading(false);
		};

		get();
		// eslint-disable-next-line
	}, [data]);

	const createData = () => {
		return new Promise((resolve) => {
			let totalContribs = 0;
			let totalInterest = 0;
			let principal = data['datasets'][0].data[0];

			const headers = [
				`${breakdown === 'yearly' ? 'Year' : 'Month'}`,
				`${depositting ? 'Deposits' : 'Withdrawals'} (${currency.label})`,
				`Interest (${currency.label})`,
				`Total ${depositting ? 'Deposits' : 'Withdrawals'} (${currency.label})`,
				`Total Interest (${currency.label})`,
				`Balance (${currency.label})`,
			];

			const rows = data.labels.map((month, i) => {
				const first = i === 0;
				const rowIndex = i;
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

				return [
					rowIndex,
					Number(contribs).toFixed(2),
					Number(interest).toFixed(2),
					Number(totalContribs).toFixed(2),
					Number(totalInterest).toFixed(2),
					Number(balance).toFixed(2),
				];
			});   

			resolve([headers, ...rows]);
		});
	};

	return (
		<div className="options-toggler-container button-toggler-container">
			{!loading ? (
				<button className='btn-block' aria-label='download breakdown data in csv format'>
					<CSVLink
						aria-hidden
						className="btn btn-static btn-block"
						tabIndex={-1}
						filename={`${
							activeCalculation?.name
								? `${activeCalculation.name.replaceAll(' ', '')}-${breakdown}.csv`
								: 'calculation.csv'
						}`}
						data={CSVData}
					>
						<FaFileDownload /> .csv
					</CSVLink>
				</button>
			) : (
				<button className="btn btn-static btn-block" aria-label='breakdown data is loading'>
					<span className="spin">
						<FaCircleNotch />
					</span>
				</button>
			)}
		</div>
	);
};

export default DownloadTableButton;
