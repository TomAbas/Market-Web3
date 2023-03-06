/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
// mui
import { Stack, Typography, Box, Avatar, Tooltip, Link } from '@mui/material';
// components
import DividerGradient from 'components/CustomUI/DividerGradient';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
// models
import {
	ListOption,
	DropDownContent,
	SelectOptionBox,
	OptionItem,
	ContentWrapper,
	DropDownOverlay,
} from './styled';
import FieldInput from '../FieldInput';

export interface OptionSelectCustom<T> {
	name: string;
	value: T;
	image?: string;
	chainId?: number;
}

export interface AutoCompleteCustomProps {
	headerIcon?: string;
	currentItem: OptionSelectCustom<any> | null | undefined;
	listItem: OptionSelectCustom<any>[];
	placeholder?: string;
	onChange?: (value: OptionSelectCustom<any> | null | undefined) => void; // use when this select box impact on another state (ex: datetimepicker)
	disabled?: boolean;
	sx?: any;
	registerHookForm?: object;
}

function AutoCompleteCustom({
	currentItem,
	listItem,
	sx,
	placeholder,
	onChange,
	headerIcon,
	registerHookForm,
	disabled = false,
}: AutoCompleteCustomProps) {
	// useRef
	const ref: any = useRef(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// useState
	const [inputValue, setInputValue] = useState<string>('');
	const [activeSelectOption, setActiveSelectOption] = useState(false);

	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();

			if (ref.current && !ref.current.contains(event.target)) {
				setActiveSelectOption(false);

				// reset the input value to current item name if user not enter correct value
				if (currentItem) {
					setInputValue(currentItem.name);
				}
			}
		};
		// Bind the event listener if dropdown is active
		if (activeSelectOption)
			document.body.addEventListener('click', onBodyClick, { passive: true });

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeSelectOption, currentItem]);

	useEffect(() => {
		if (currentItem) {
			setInputValue(currentItem.name);
		} else {
			setInputValue('');
		}
	}, [currentItem]);

	const showOptionBox = () => {
		if (!activeSelectOption && !disabled) {
			setActiveSelectOption(true);
			if (inputRef.current) inputRef.current.focus();
		}
	};

	const handleSetOption = (e: any, value: OptionSelectCustom<any>) => {
		e.stopPropagation();

		if (onChange) onChange(value);
		setActiveSelectOption(false);
	};

	const handleOnChangeInputValue = (e: any) => {
		const newValue = e.target.value;
		setInputValue(newValue);

		if (newValue === '') {
			if (onChange) onChange(null);
		}
	};

	// new filtered list by input value
	const listItemFiltered = true
		? listItem
		: listItem.filter((item: OptionSelectCustom<any>) =>
				item.name.toLowerCase().includes(inputValue.toLowerCase())
		  );

	const renderListOption = () => {
		return listItemFiltered.map((item: OptionSelectCustom<any>, idx: number) => {
			if (idx === 0) {
				return <></>;
			}
			return (
				<Box key={idx}>
					<OptionItem>
						<ContentWrapper>
							<Stack direction="row" alignItems="center" gap={2}>
								<Avatar src={item?.image} variant="square" />
								<Stack
									direction={'column'}
									sx={{ maxWidth: '100%', overflow: 'hidden' }}
								>
									<Tooltip title={item?.value}>
										<Link
											href={`/#/profile?address=${item?.value}`}
											underline="none"
										>
											<Typography fontWeight="400" variant="subtitle1" noWrap>
												{item.name}
											</Typography>
										</Link>
									</Tooltip>
								</Stack>
							</Stack>
						</ContentWrapper>
					</OptionItem>
					{idx + 1 !== listItem.length && <DividerGradient />}
				</Box>
			);
		});
	};

	return (
		<SelectOptionBox onClick={showOptionBox} sx={sx}>
			<Stack spacing={2}>
				<Typography variant="body1" fontWeight={500}>
					Owner
				</Typography>
				<Stack>
					{currentItem?.name && (
						<Stack direction="row" alignItems="center" spacing={2}>
							<Avatar src={currentItem?.image} variant="square" />
							<Stack direction="row">
								<Tooltip title={currentItem?.value}>
									<Link
										href={`/#/profile?address=${currentItem?.value}`}
										underline="none"
									>
										<Typography fontWeight="400" variant="subtitle1" noWrap>
											{currentItem.name}
										</Typography>
									</Link>
								</Tooltip>

								{!disabled && listItemFiltered.length > 1 && (
									<ArrowDropDownOutlinedIcon
										sx={{
											position: 'absolute',
											top: '50%',
											right: '10px',
											transform: 'translateY(-50%)',
											zIndex: 0,
										}}
									/>
								)}
							</Stack>
						</Stack>
					)}
				</Stack>
			</Stack>
			<DropDownOverlay className={activeSelectOption ? 'active' : ''} />

			<DropDownContent ref={ref} className={activeSelectOption ? 'active' : ''}>
				<ListOption>{renderListOption()}</ListOption>
			</DropDownContent>
		</SelectOptionBox>
	);
}

export default AutoCompleteCustom;
