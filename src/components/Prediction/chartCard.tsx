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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import usePredict from 'utils/prediction';
const data = [
	{ year: 'OP1', population: 2 },
	{ year: 'OP2', population: 3 },
	{ year: 'OP3', population: 8 },
	{ year: 'OP4', population: 4 },
	{ year: 'OP5', population: 2 },
	{ year: 'OP6', population: 6 },
	{ year: 'OP7', population: 7 },
];
interface ModalPlacePredict {
	option: string;
	amount: number;
}
const Chart2 = ({ event }: any) => {
	const { predictEvent } = usePredict();
	const [valueTab, setValueTab] = React.useState('1');
	event.options = event.options.map((item: any, index: number) => {
		return { ...item, key: `Option ${index + 1}` };
	});
	const [option, setOption] = React.useState();
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValueTab(newValue);
	};
	const handleSelectOption = (value: any) => {
		setOption(value);
		let selectedOption = event.options.find((item: any) => item.key === value.name);
		setValue('option', selectedOption.name);
	};
	const schema = yup
		.object({
			amount: yup
				.number()
				.integer()
				.min(0, "Can't be negative")
				.transform((cv, ov) => {
					// handle case not enter a number throw error: NaN cast from ""
					return ov === '' ? undefined : cv;
				})
				.required('Required'),
			option: yup.string().required('Required'),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ModalPlacePredict>({
		resolver: yupResolver(schema),
	});
	//

	const onSubmit = async (data: any) => {
		console.log(data);
		let eventData = {
			coinType: event.coinType,
			option: data.option,
			amount: data.amount,
			creator: event.userAddress,
			description: event.description,
			options: event.options.map((item: any) => item.name),
		};
		await predictEvent(eventData);
	};

	return (
		<Stack direction={'row'} spacing={4}>
			<Box sx={{ width: '100%' }}>
				<TabContext value={valueTab}>
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							border: '1.5px solid #e7e8ec',
							p: 2,
						}}
					>
						<Box sx={{ marginBottom: '20px' }}>
							<InputItem>
								<InputTitle>Option</InputTitle>
							</InputItem>
							<AutoCompleteCustom
								{...register('option')}
								currentItem={option}
								listItem={event.options.map((item: any) => {
									return { name: item.key };
								})}
								placeholder="Option 1"
								onChange={handleSelectOption}
								sx={{
									input: {
										padding: '15px 5px 15px 0',
									},
								}}
							/>
							{errors.option?.message && (
								<Typography
									variant="body1"
									sx={{
										pt: 1,
										float: 'right',
										width: '100%',
										fontSize: '12px',
										marginTop: '4px',
										marginLeft: '10px',
										color: 'red',
									}}
								>
									<>{errors.option?.message}</>
								</Typography>
							)}
						</Box>
						<InputItem>
							<InputTitle>Amount</InputTitle>
							<input type="number" placeholder="0" {...register('amount')} />
							{errors.amount?.message && (
								<Typography
									variant="body1"
									sx={{
										pt: 1,
										float: 'right',
										width: '100%',
										marginLeft: '10px',
										color: '#c4c4c4',
										fontSize: '12px',
									}}
								>
									<>{errors.amount?.message}</>
								</Typography>
							)}
						</InputItem>
						<ButtonWhite type="submit" sx={{ marginTop: '20px' }}>
							Predict
						</ButtonWhite>
					</Box>
				</form>
			</Box>
		</Stack>
	);
};
export default Chart2;
