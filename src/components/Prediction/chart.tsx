/* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack, Box, Typography, Radio } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Chart, PieSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { Animation, Palette } from '@devexpress/dx-react-chart';

// const listColor = ['#fffaaa', '#122222', '#ad225f', '#0a764b', '#678ff0', '#890FF1'];

// export default class Demo extends React.PureComponent {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			data,
// 		};
// 	}

// 	render() {
// 		const { data: chartData } = this.state;

// 		return (
// 			<Paper>
// 				<Chart data={chartData}>
// 					<PieSeries valueField="val" argumentField="region" innerRadius={0.6} />
// 					<Title text="The Population of Continents and Regions" />
// 					<Animation />
// 				</Chart>
// 			</Paper>
// 		);
// 	}
// }
interface Props {
	options: Array<any>;
}

const Chart1 = ({ options }: Props) => {
	const [chartData, setChartData] = useState<any>([]);
	useEffect(() => {
		setChartData(options.map((item, index) => ({ name: item, val: 1 })));
	}, [options]);

	const listColor = ['#40C4FF', '#FF5252', '#00C853', '#FFEB3B', 'rgb(38, 166, 154)', '#FF4081'];
	return (
		<Stack direction={'row'} justifyContent={'center'}>
			<Box sx={{ width: '50%' }}>
				<Chart data={chartData} height={110}>
					<PieSeries valueField="val" argumentField="name" innerRadius={0.6} />
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
								<Typography noWrap>{item}</Typography>
								<Typography>10%</Typography>
							</Stack>
						);
					})}
				</Typography>
			</Stack>
		</Stack>
	);
};
export default Chart1;
