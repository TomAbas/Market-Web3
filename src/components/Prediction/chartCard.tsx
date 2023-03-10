/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Stack, Box, Typography, Tab, Avatar } from '@mui/material';
import { Chart, BarSeries, ArgumentAxis } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { InputItem, InputTitle } from 'components/Mint/styled';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import AutoCompleteCustom from 'components/CustomField/AutoCompleteCustom';

import { Option } from 'constants/predict';
import { ItemCardStyle } from 'components/Marketplace/CardNFT/styled';
import CountDown from 'customComponents/CountDown';
import ActivityTab from 'components/Profile/TabUserInfo/ActivityTab/ActivityTab';

const data = [
	{ year: 'OP1', population: 2 },
	{ year: 'OP2', population: 3 },
	{ year: 'OP3', population: 8 },
	{ year: 'OP4', population: 4 },
	{ year: 'OP5', population: 2 },
	{ year: 'OP6', population: 6 },
	{ year: 'OP7', population: 7 },
];
const Chart2 = ({ event }: any) => {
	event.options = event.options.map((item: any, index: number) => {
		return { ...item, key: `Option ${index + 1}` };
	});
	const [tokenPayment] = React.useState<any>(null);
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	const [chartData] = React.useState(data);
	const [value, setValue] = React.useState('1');
	return (
		<Stack direction={'row'} spacing={4}>
			<Box sx={{ width: '100%' }}>
				<TabContext value={value}>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: 'divider',
							button: {
								fontSize: '20px',
								textTransform: 'none',
								color: '#131740',
								fontFamily: 'Montserrat, sans-serif',
								fontWeight: '600',
								fontStyle: 'italic',
							},
						}}
					>
						<TabList centered onChange={handleChange} aria-label="lab API tabs example">
							<Tab label="History" value="1" />
						</TabList>
					</Box>
					<TabPanel value="1">
						<Stack sx={{ width: '100%', height: 220 }}>
							<Chart data={event.options}>
								<ArgumentAxis />
								<BarSeries valueField="value" argumentField="key" />
								<Animation />
							</Chart>
						</Stack>

						<ActivityTab infoUser={[]} />
					</TabPanel>
					<TabPanel value="2">
						<Box sx={{ width: '100%', height: 220 }}></Box>
					</TabPanel>
				</TabContext>
			</Box>
			<Stack direction={'column'} spacing={4}>
				<Box
					sx={{
						background: '#FFFF',
						padding: '2px 2px 2px 8px',
						border: '1px solid gainsboro',
						height: '255px',
						overflowY: 'auto',
						'&::-webkit-scrollbar': {
							display: 'block',
							width: 3,
						},
						'&::-webkit-scrollbar-track': {
							display: 'block',
							background: '#0c5599',
						},
						'&::-webkit-scrollbar-thumb': {
							display: 'block',
							background: '#65b8ff',
							borderRadius: '5px',
						},
					}}
				>
					<Typography sx={{ fontWeight: 700 }}>Option</Typography>
					<hr />
					<Stack direction={'row'}>
						<Typography sx={{ marginTop: '7px' }}>
							Option 1: Pinocchio - Best Animated Feature Film
						</Typography>
					</Stack>
					<Stack direction={'row'}>
						<Typography sx={{ marginTop: '7px' }}>
							Option 2: "The Fabelmans" - Best Picture
						</Typography>
					</Stack>
					<Stack direction={'row'}>
						<Typography sx={{ marginTop: '7px' }}>
							Option 3: "The Fabelmans" - Best Picture
						</Typography>
					</Stack>
					<Stack direction={'row'}>
						<Typography sx={{ marginTop: '7px' }}>
							Option 4: "The Fabelmans" - Best Picture
						</Typography>
					</Stack>
					<Stack direction={'row'}>
						<Typography sx={{ marginTop: '7px' }}>
							Option 5: "The Fabelmans" - Best Picture
						</Typography>
					</Stack>
					<Stack direction={'row'}>
						<Typography sx={{ marginTop: '7px' }}>
							Option 6: "The Fabelmans" - Best Picture
						</Typography>
					</Stack>
				</Box>
				<Box sx={{ width: '100%' }}>
					<form>
						<Box
							sx={{
								border: '1.5px solid #e7e8ec',
								p: 2,
							}}
						>
							<Box sx={{ backgroundColor: '#0071E3', borderRadius: '5px' }}>
								<CountDown
									timeStart={event.startTime}
									timeEnd={event.endTime}
									className={''}
									executeZero={() => {}}
									executeOne={() => {}}
								/>
							</Box>
							<Typography sx={{ fontWeight: 700 }}>Option</Typography>
							<AutoCompleteCustom
								currentItem={tokenPayment}
								listItem={event.options}
								placeholder="Option 1"
								// disabled={!state.feeMethod}
								sx={{
									borderRadius: '12px',
									input: {
										padding: '15px 5px 15px 0',
									},
								}}
							/>

							<InputItem>
								<InputTitle sx={{ display: 'flex' }}>Amount</InputTitle>
								<input type="text" placeholder="0" />
							</InputItem>
							<Typography sx={{ fontWeight: 700 }}>Percentage</Typography>
							<Box>
								<Stack direction={'row'} spacing={2}>
									<Box
										sx={{
											border: '1.5px solid #e7e8ec',
											cursor: 'pointer',
											'&:hover': {
												color: '#FFFFFF',
												background: '#1976d2',
											},
										}}
									>
										25%
									</Box>
									<Box
										sx={{
											border: '1.5px solid #e7e8ec',
											cursor: 'pointer',
											'&:hover': {
												color: '#FFFFFF',
												background: '#1976d2',
											},
										}}
									>
										50%
									</Box>
									<Box
										sx={{
											border: '1.5px solid #e7e8ec',
											cursor: 'pointer',
											'&:hover': {
												color: '#FFFFFF',
												background: '#1976d2',
											},
										}}
									>
										75%
									</Box>
								</Stack>
							</Box>
							<Box
								sx={{
									cursor: 'pointer',
									backgroundColor: '#0071E3',
									marginTop: '30px',
									width: '100%',
									border: '1px solid gainsboro',
									borderRadius: 2,
									textAlign: 'center',
									padding: 1,
									bottom: 0,
								}}
							>
								Predict
							</Box>
						</Box>
					</form>
				</Box>
			</Stack>
		</Stack>
	);
};
export default Chart2;
