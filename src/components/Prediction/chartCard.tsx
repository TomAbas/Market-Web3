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
import ActivityTab from 'components/Profile/TabUserInfo/ActivityTab/ActivityTab';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import usePredict from 'utils/prediction';

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
		let eventData = {
			_id: event._id,
			coinType: event.coinType,
			option: data.option,
			amount: data.amount,
			creator: event.userAddress,
			description: event.description,
			options: event.options.map((item: any) => item.name),
			optionId: event.options.find((item: any) => item.name === data.option)._id,
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
