import * as React from 'react';
import { Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Chart, BarSeries, ArgumentAxis } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
	{ year: 'OP1', population: 2.525 },
	{ year: 'OP2', population: 3.018 },
	{ year: 'OP3', population: 3.682 },
	{ year: 'OP4', population: 4.44 },
	{ year: 'OP5', population: 5.31 },
	{ year: 'OP6', population: 6.127 },
	{ year: 'OP7', population: 6.93 },
];
const Chart2 = () => {
	const [chartData] = React.useState(data);
	return (
		<Stack sx={{ width: 350, height: 220 }}>
			<Paper>
				<Chart data={chartData}>
					<ArgumentAxis />
					<BarSeries valueField="population" argumentField="year" />
					<Animation />
				</Chart>
			</Paper>
		</Stack>
	);
};
export default Chart2;
