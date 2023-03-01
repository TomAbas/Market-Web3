/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { CountdownContain, FireIcon, LeftText, TimeArticle, TimeTitle, TimeValue } from './styled';
import { Typography } from '@mui/material';

export interface ICountDownProps {
	timeStart: number;
	timeEnd: number;
	className: string;
	executeZero?: Function;
	executeOne?: Function;
}

export default function CountDown({
	timeStart,
	timeEnd,
	executeZero,
	executeOne,
}: ICountDownProps) {
	const [days, setDays] = useState('00');
	const [hours, setHours] = useState('00');
	const [minutes, setMinutes] = useState('00');
	const [seconds, setSeconds] = useState('00');

	useEffect(() => {
		const interval = setInterval(() => {
			const today = new Date().getTime();
			// console.log(today);
			const seconds = 1000;
			const minutes = seconds * 60;
			const hours = minutes * 60;
			const days = hours * 24;
			const convertTime = (timeDiff: number) => {
				let cDays: any = Math.floor(timeDiff / days);
				let cHours: any = Math.floor((timeDiff % days) / hours);
				let cMinutes: any = Math.floor((timeDiff % hours) / minutes);
				let cSeconds: any = Math.floor((timeDiff % minutes) / seconds);
				cDays = cDays < 10 ? '0' + cDays : cDays;
				cHours = cHours < 10 ? '0' + cHours : cHours;
				cMinutes = cMinutes < 10 ? '0' + cMinutes : cMinutes;
				cSeconds = cSeconds < 10 ? '0' + cSeconds : cSeconds;
				let objTime = {
					days: cDays.toString(),
					hours: cHours.toString(),
					minutes: cMinutes.toString(),
					seconds: cSeconds.toString(),
				};
				return objTime;
			};

			if (timeStart > today && executeZero && executeOne) {
				executeZero();
				const timeDiff = timeStart - today;
				let timeObj = convertTime(timeDiff);
				// console.log(timeObj);
				setDays(timeObj.days);
				setHours(timeObj.hours);
				setMinutes(timeObj.minutes);
				setSeconds(timeObj.seconds);
				if (
					timeObj.days === '00' &&
					timeObj.hours === '00' &&
					timeObj.minutes === '00' &&
					timeObj.seconds === '00'
				) {
					executeOne();
				}
			} else if (today > timeStart && executeZero) {
				const timeDiff = timeEnd - today;
				let timeObj = convertTime(timeDiff);
				// console.log(timeObj);
				setDays(timeObj.days);
				setHours(timeObj.hours);
				setMinutes(timeObj.minutes);
				setSeconds(timeObj.seconds);
				if (
					timeObj.days === '00' &&
					timeObj.hours === '00' &&
					timeObj.minutes === '00' &&
					timeObj.seconds === '00'
				) {
					executeZero();
				}
			} else if (today > timeEnd) {
				setDays('00');
				setHours('00');
				setMinutes('00');
				setSeconds('00');
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	return (
		<CountdownContain>
			<TimeArticle>
				<TimeValue sx={{}}>{days} Days &nbsp;</TimeValue>
				{/* <TimeTitle>Days</TimeTitle> */}
			</TimeArticle>
			<TimeArticle>
				<TimeValue> </TimeValue>
			</TimeArticle>
			<TimeArticle>
				<TimeValue> {hours}:</TimeValue>
				{/* <TimeTitle>Hours</TimeTitle> */}
			</TimeArticle>
			<TimeArticle>
				<TimeValue> </TimeValue>
			</TimeArticle>
			<TimeArticle>
				<TimeValue>{minutes}:</TimeValue>
				{/* <TimeTitle>Minutes</TimeTitle> */}
			</TimeArticle>
			<TimeArticle>
				<TimeValue> </TimeValue>
			</TimeArticle>
			<TimeArticle>
				<TimeValue>{seconds}</TimeValue>
			</TimeArticle>

			{/* <LeftText>Left</LeftText> */}

			{/* <FireIcon src="/fire.webp" alt="fire" /> */}
		</CountdownContain>
	);
}
