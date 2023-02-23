/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState } from 'react';
import moment, { Moment } from 'moment';
//mui
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import DateTimePicker from '@mui/lab/DateTimePicker';
import { Box, Stack, Typography, useTheme } from '@mui/material';
//utils
import { compareDate } from 'utils/function';
//styled
import { DatePickerTextField, DatePickerVisiblePart, DatePickerWrapper } from './styled';
import { Title } from 'components/Marketplace/SellItemPage/Styled';
//components
import SelectCustom from 'customComponents/SelectCustom';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
// models
import { OptionSelectCustom } from 'models/common';
// image
import IconCalendarBlack from '../../assets/icons/calendar-black.webp';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectEndTime, selectStartTime, setEndTime, setStartTime } from 'redux/slices/sellItem';

export interface IDateTimeCustomPickerProps {
	setValue: any;
	// setStartTime: any;
	// setExpirationTime: any;
	// setWithdrawExpirationTime: any;
	setInit: any;
}

const dateRanges: any[] = [
	{ name: '7 days (Default)', value: '7' },
	{ name: '1 day', value: '1' },
	{ name: '3 days', value: '3' },
	{ name: '30 days', value: '30' },
	{ name: '60 days', value: '60' },
];

export default function DateTimeCustomPicker({ setValue, setInit }: IDateTimeCustomPickerProps) {
	const theme = useTheme();
	const startTime = useAppSelector(selectStartTime);
	const endTime = useAppSelector(selectEndTime);
	const dispatch = useAppDispatch();
	const [currentDuration, setCurrentDuration] = useState<any>(dateRanges[0]);

	// change endDate base on startDate and selected duration
	const onChangeDuration = (duration: OptionSelectCustom<string>) => {
		setCurrentDuration(duration);
		setValue('startTime', new Date(new Date().getTime()).getTime());
		const updateEndDate: Moment = moment(startTime).add(duration.value, 'days');
		dispatch(setEndTime(updateEndDate.toString()));
		setInit(false);
	};

	const handleChangeStartDateTime = (newValue: Date | null) => {
		if (newValue) {
			dispatch(setStartTime(newValue.toString()));
			setValue('startTime', new Date(newValue.toString()).getTime());
			// change endDate if new startDate >= endDate
			if (compareDate(newValue, endTime) >= 0) {
				const newEndDate: Date = moment(newValue).add(1, 'days').toDate();
				setValue('endTime', new Date(newEndDate.toString()).getTime());
				dispatch(setEndTime(newEndDate.toString()));
			}
		}
		setInit(false);
	};

	const handleChangeEndDateTime = (newValue: Date | null) => {
		if (newValue) {
			// change endDate if startDate >= new endDate

			if (compareDate(startTime, newValue) >= 0) {
				const newEndDate: Date = moment(startTime).add(1, 'days').toDate();
				setValue('endTime', new Date(newEndDate.toString()).getTime());
				dispatch(setEndTime(newEndDate.toString()));
			} else {
				setValue('endTime', new Date(newValue.toString()).getTime());
				console.log(new Date(newValue.toString()).getTime());
				dispatch(setEndTime(newValue.toString()));
			}
		}
		setInit(false);
	};

	return (
		<Fragment>
			{/* <DateTimePicker
				disablePast
				value={startTime}
				onChange={(newValue: any) => handleChangeStartDateTime(newValue)}
				renderInput={(params: any) => <DatePickerTextField {...params} />}
			/> */}
			<SelectCustom
				currentItem={currentDuration}
				listItem={dateRanges}
				onChange={onChangeDuration}
				headerIcon={IconCalendarBlack}
				sx={{
					padding: '10px',
				}}
			/>

			<Stack
				direction="row"
				alignItems="center"
				spacing={2}
				mt={3}
				sx={{
					'@media (max-width: 1500px)': {
						flexDirection: 'column',
					},
				}}
			>
				<Stack
					direction="row"
					alignItems="center"
					spacing={2}
					sx={{
						width: '50%',
						'@media (max-width: 1500px)': {
							width: '100%',
						},
					}}
				>
					<Title variant="h6" sx={{ flexShrink: 0, width: '80px' }}>
						Starting
					</Title>

					<Box sx={{ flexGrow: 1 }}>
						<DatePickerWrapper>
							<LocalizationProvider dateAdapter={AdapterMoment}>
								<DateTimePicker
									disablePast
									value={startTime}
									onChange={(newValue: any) =>
										handleChangeStartDateTime(newValue)
									}
									renderInput={(params: any) => (
										<DatePickerTextField {...params} />
									)}
								/>
							</LocalizationProvider>
							<DatePickerVisiblePart>
								<Stack
									alignItems="center"
									justifyContent="space-between"
									sx={{ width: '100%' }}
									direction="row"
								>
									<Typography
										variant="body1"
										sx={{
											[theme.breakpoints.down(420)]: {
												fontSize: 12,
											},
										}}
									>
										{moment(startTime).format('LL')} (
										{moment(startTime).format('LT')})
									</Typography>
									<ArrowDropDownOutlinedIcon sx={{ ml: 2 }} />
								</Stack>
							</DatePickerVisiblePart>
						</DatePickerWrapper>
					</Box>
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					spacing={2}
					sx={{
						width: '50%',
						'@media (max-width: 1500px)': {
							width: '100%',
							marginLeft: '0 !important',
						},
					}}
				>
					<Title variant="h6" sx={{ flexShrink: 0, width: '80px' }}>
						Ending
					</Title>

					<Box sx={{ flexGrow: 1 }}>
						<DatePickerWrapper>
							<LocalizationProvider dateAdapter={AdapterMoment}>
								<DateTimePicker
									disablePast
									value={endTime}
									minDate={startTime}
									onChange={(newValue: any) => handleChangeEndDateTime(newValue)}
									renderInput={(params: any) => (
										<DatePickerTextField {...params} />
									)}
								/>
							</LocalizationProvider>
							<DatePickerVisiblePart>
								<Stack
									alignItems="center"
									justifyContent="space-between"
									sx={{ width: '100%' }}
									direction="row"
								>
									<Typography
										variant="body1"
										sx={{
											[theme.breakpoints.down(420)]: {
												fontSize: 12,
											},
										}}
									>
										{moment(endTime).format('LL')} (
										{moment(endTime).format('LT')})
									</Typography>
									<ArrowDropDownOutlinedIcon sx={{ ml: 2 }} />
								</Stack>
							</DatePickerVisiblePart>
						</DatePickerWrapper>
					</Box>
				</Stack>
			</Stack>
		</Fragment>
	);
}
