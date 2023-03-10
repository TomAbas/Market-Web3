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
							<Tab label="Detail" value="1" />
							<Tab label="History" value="2" />
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
						<form>
							<Stack direction={'row'}>
								<Box
									sx={{
										width: '100%',
										border: '1px solid gainsboro',
										borderRadius: 2,
										textAlign: 'center',
										padding: 1,
									}}
								>
									<Stack direction={'row'}>
										<Typography sx={{ marginLeft: '40px' }}>Option</Typography>
										<Typography sx={{ marginLeft: '260px' }}>Name</Typography>
									</Stack>
									<hr />
									{event.options.map((item: any, index: number) => {
										return (
											<>
												<Stack direction={'row'}>
													<Avatar
														alt="Remy Sharp"
														src="https://www.seekpng.com/png/full/72-729756_how-to-add-a-new-user-to-your.png"
													/>

													<Typography>{item.key}</Typography>
													<Typography sx={{ marginLeft: '250px' }}>
														stacke
													</Typography>
												</Stack>
												<hr />
											</>
										);
									})}
								</Box>
							</Stack>
						</form>
					</TabPanel>
					<TabPanel value="2">
						<Box sx={{ width: '100%', height: 220 }}></Box>
					</TabPanel>
				</TabContext>
			</Box>
			<Box sx={{ width: '100%' }}>
				<form>
					<Box
						sx={{
							border: '1.5px solid #e7e8ec',
							p: 2,
						}}
					>
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
							<InputTitle sx={{ display: 'flex' }}>
								Amount
								<Typography
									sx={{
										marginLeft: '10px',
										color: '#c4c4c4',
										fontSize: '12px',
										fontWeight: 'normal',
									}}
								></Typography>
							</InputTitle>
							<input type="text" placeholder="0" />
						</InputItem>
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
	);
};
export default Chart2;
