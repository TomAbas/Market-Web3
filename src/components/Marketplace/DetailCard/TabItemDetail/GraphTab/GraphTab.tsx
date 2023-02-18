import React from 'react';
import merge from 'lodash/merge';
import moment from 'moment';
// components
import ReactApexChart from 'react-apexcharts';
import BaseOptionChart from './BaseOptionChart';
import { ApexOptions } from 'apexcharts';
import { Box } from '@mui/material';
import { YaxisTitle } from 'components/Marketplace/CollectionDetail/TabCollectionDetail/ActivityTab/styled';
import { PriceActivity } from 'models/common';

export interface IGraphTabProps {
	listActivityPriceChart: PriceActivity[];
}
const GraphTab: React.FC<IGraphTabProps> = ({ listActivityPriceChart }) => {
	const priceDataList: number[] = listActivityPriceChart.map((item: PriceActivity) =>
		Number(item.avgPrice.toFixed(2))
	);
	const categoriesDataList: string[] = listActivityPriceChart.map((item: PriceActivity) =>
		moment(item.date).subtract(1, 'days').format('ll')
	);

	const CHART_DATA = [{ name: 'Price (USD)', data: priceDataList }];

	const chartOptions: ApexOptions = merge(BaseOptionChart(), {
		xaxis: {
			categories: categoriesDataList,
			labels: {
				style: {
					colors: '#fff',
				},
			},
		},
		tooltip: { x: { show: false }, marker: { show: false } },
		yaxis: [
			{
				labels: {
					style: {
						colors: '#000',
					},
					formatter: function (val: number, index: number): string {
						// lib give number 5e-324 when compile, too small
						if (val < 0.01) return '0';

						return val.toFixed(2);
					},
				},
			},
		],
	});

	return (
		<Box sx={{ position: 'relative', mt: 5 }}>
			<YaxisTitle variant="subtitle2">Price (USD)</YaxisTitle>
			<ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={320} />
		</Box>
	);
};

export default GraphTab;
