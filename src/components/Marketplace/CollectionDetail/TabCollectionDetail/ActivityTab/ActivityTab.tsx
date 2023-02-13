import React from 'react';
import Graph from './Graph/Graph';
const dataChart = [
	{
		date: '2022-08-02T17:00:00.000Z',
		avgPrice: 1680.1659828,
	},
	{
		date: '2022-08-12T17:00:00.000Z',
		avgPrice: 16801.659828,
	},
];

const ActivityTab = () => {
	return (
		<>
			<Graph listActivityPriceChart={dataChart} />
		</>
	);
};

export default ActivityTab;
