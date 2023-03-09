/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack, Box, Typography, Radio } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Chart, PieSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { Animation, Palette } from '@devexpress/dx-react-chart';

interface Props {
	options: Array<any>;
}

const getPercent = (arrValue: Array<number>, value: number) => {
	console.log(arrValue);
	console.log(value);
	const total = arrValue.reduce((a, b) => a + b, 0);
	if (total === 0) return '0%';
	return `${((value / total) * 100).toFixed(2)}%`;
};

const Chart1 = ({ options }: Props) => {
	const listColor = ['#40C4FF', '#FF5252', '#00C853', '#FFEB3B', 'rgb(38, 166, 154)', '#FF4081'];
	return (
		<Stack direction={'row'} justifyContent={'center'}>
			<Box sx={{ width: '50%' }}>
				<Chart data={options} height={110}>
					<PieSeries valueField="value" argumentField="name" innerRadius={0.6} />
					{/* <Animation /> */}
					<Palette scheme={listColor} />
				</Chart>
			</Box>

			<Stack direction={'column'} sx={{ width: '50%' }}>
				<Typography align={'right'}>
					{options.map((item, index) => {
						return (
							<Stack
								key={index}
								justifyContent={'space-between'}
								alignItems={'center'}
								direction={'row'}
								spacing={1}
							>
								<Box
									sx={{
										borderRadius: '50%',
										background: listColor[index],
										p: 0.5,
										width: '5px',
										height: '5px',
									}}
								></Box>
								<Typography noWrap>{item.name}</Typography>
								<Typography>
									{getPercent(
										options.map((item) => Number(item.value)),
										item.value
									)}
								</Typography>
							</Stack>
						);
					})}
				</Typography>
			</Stack>
		</Stack>
	);
};
export default Chart1;
