/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Box, ClickAwayListener, Stack, Typography } from '@mui/material';
import {
	ButtonWrapper,
	ButtonStyled,
	IconStyled,
	ButtonTitle,
	DropdownWrapper,
	DropdownButtonGroup,
	ListOption,
	OptionItem,
	OptionItemText,
	CheckIconWrapper,
} from '../styled';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import iconPriceBlack from '../../../../assets/icons/icon-filter-price.svg';
import { setFilter } from 'redux/slices/nftFilter';
import { useAppDispatch } from 'redux/hooks';
import { ITEM_STATUS } from 'models/item';
const listStatus: Status[] = [
	{ id: 1, name: 'Created', value: ITEM_STATUS.BUY_NOW },
	{ id: 0, name: 'Collected', value: ITEM_STATUS.NOT_FOR_SELL },
];
interface Status {
	id: number;
	name: string;
	value: number;
}
const FilterRoyal = () => {
	const dispath = useAppDispatch();
	const [selected, setSelected] = useState<number[]>([]);
	const [open, setOpen] = useState(false);
	//function
	function openModal() {
		setOpen(!open);
	}
	function handleClickOption(id: number) {
		if (selected.includes(id)) {
			setSelected((prev) => prev.filter((item) => item !== id));
		} else {
			setSelected((prev) => [...prev, id]);
		}
	}
	function handleClear() {
		setSelected([]);
		dispath(setFilter({ statusRoyal: [] }));
	}
	function handleApply() {
		dispath(setFilter({ statusRoyal: selected }));
	}
	return (
		<>
			<Box sx={{ position: 'relative' }}>
				<ButtonWrapper onClick={openModal}>
					{/* {buttonTitle !== defaultButtonTitle && (
            <ButtonBadge>{defaultButtonTitle}</ButtonBadge>
        )} */}
					<ButtonStyled>
						<IconStyled sx={{ width: '14px' }}>
							<img src={iconPriceBlack} alt="icon price" />
						</IconStyled>
						<ButtonTitle>Collect</ButtonTitle>
					</ButtonStyled>
				</ButtonWrapper>
				{open && (
					<ClickAwayListener onClickAway={() => openModal()}>
						<Box sx={{ position: 'absolute', zIndex: 999, left: 0, top: '110%' }}>
							<DropdownWrapper sx={{ minWidth: '300px' }}>
								<Stack
									direction="row"
									alignItems="center"
									spacing={1}
									sx={{ mt: 1, width: '92%', mx: 'auto' }}
								></Stack>

								{/* <DividerGradient sx={{ mt: 1 }} /> */}
								<ListOption>
									{listStatus.map((item: Status, idx: number) => {
										const isItemSelected = selected.indexOf(item.id!) !== -1;

										return (
											<OptionItem
												key={idx}
												onClick={() => {
													handleClickOption(item.id);
												}}
											>
												<OptionItemText>{item.name}</OptionItemText>

												{isItemSelected && (
													<CheckIconWrapper>
														<CheckIcon
															sx={{ width: '100%', height: '100%' }}
														/>
													</CheckIconWrapper>
												)}
											</OptionItem>
										);
									})}
								</ListOption>
								<DropdownButtonGroup>
									<ButtonWhite onClick={handleClear} sx={{ width: '130px' }}>
										Clear
									</ButtonWhite>
									<ButtonWhite onClick={handleApply} sx={{ width: '130px' }}>
										Apply
									</ButtonWhite>
								</DropdownButtonGroup>
							</DropdownWrapper>
						</Box>
					</ClickAwayListener>
				)}
			</Box>
		</>
	);
};

export default FilterRoyal;
