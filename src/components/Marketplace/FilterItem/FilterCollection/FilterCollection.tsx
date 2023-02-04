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
import { getAllCollections as getAllCollectionsAPI } from 'api/collectionApi';
import { Collection } from 'models/collection';

const FilterCollection = () => {
	const dispath = useAppDispatch();
	const [selected, setSelected] = useState<string[]>([]);
	const [collections, setCollections] = useState<Collection[]>([]);
	const [open, setOpen] = useState(false);
	//function
	async function getAllColection() {
		let { data } = await getAllCollectionsAPI('2');
		setCollections(data);
	}
	function openModal() {
		setOpen(!open);
	}
	function handleClickOption(id: string) {
		if (selected.includes(id)) {
			setSelected((prev) => prev.filter((item) => item !== id));
		} else {
			setSelected((prev) => [...prev, id]);
		}
	}
	function handleClear() {
		setSelected([]);
		dispath(setFilter({ status: [] }));
	}
	function handleApply() {
		dispath(setFilter({ collectionId: selected }));
	}
	useEffect(() => {
		getAllColection();
	}, []);
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
						<ButtonTitle>Collections</ButtonTitle>
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
									{collections.map((item: Collection, idx: number) => {
										const isItemSelected = selected.includes(item._id!);
										return (
											<OptionItem
												key={idx}
												onClick={() => {
													handleClickOption(item._id);
												}}
											>
												<OptionItemText>
													{item.collectionName}
												</OptionItemText>

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

export default FilterCollection;
