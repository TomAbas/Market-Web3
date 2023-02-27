/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, ClickAwayListener, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	ButtonWrapper,
	ButtonStyled,
	IconStyled,
	ButtonTitle,
	DropdownWrapper,
	DropdownButtonGroup,
} from '../styled';
import FieldInput from '../../../../components/CustomField/FieldInput/index';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import iconPriceBlack from '../../../../assets/icons/icon-filter-price.svg';
import { handleReset, setFilter } from 'redux/slices/nftFilter';
import { useAppDispatch } from 'redux/hooks';
import { toast } from 'react-toastify';
export interface IFormFilterPrice {
	minPrice: string;
	maxPrice: string;
}

const FilterPrice = () => {
	const dispatch = useAppDispatch();
	// useState
	const [open, setOpen] = useState(false);
	//form
	const schema = yup
		.object({
			minPrice: yup.number(),
			maxPrice: yup.number(),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<IFormFilterPrice>({
		resolver: yupResolver(schema),
	});
	//end form
	//function
	function openModal() {
		setOpen(!open);
	}

	function handleApply(data: any) {
		if (
			data.minPrice !== '' &&
			data.maxPrice !== '' &&
			Number(data.minPrice) > Number(data.maxPrice)
		) {
			toast.warning('Max price cannot be less than min price!');
			return;
		}

		dispatch(setFilter(data));
	}
	function handleClear() {
		reset();
		dispatch(handleReset());
	}
	//end function
	return (
		<>
			<Box>
				<ButtonWrapper onClick={openModal}>
					{/* {buttonTitle !== defaultButtonTitle && (
						<ButtonBadge>{defaultButtonTitle}</ButtonBadge>
					)} */}

					<ButtonStyled>
						<IconStyled sx={{ width: '14px' }}>
							<img src={iconPriceBlack} alt="icon price" />
						</IconStyled>
						<ButtonTitle>Price</ButtonTitle>
					</ButtonStyled>
				</ButtonWrapper>
				{open && (
					<ClickAwayListener onClickAway={() => openModal()}>
						<form
							onSubmit={handleSubmit(handleApply)}
							style={{ position: 'absolute', zIndex: 999, left: 0 }}
						>
							<DropdownWrapper sx={{ minWidth: '300px' }}>
								<Stack
									direction="row"
									alignItems="center"
									spacing={1}
									sx={{ mt: 1, width: '92%', mx: 'auto' }}
								>
									<FieldInput
										id="min-price"
										type="number"
										min={0}
										placeholder="Min"
										registerHookForm={{ ...register('minPrice') }}
										sx={{
											borderWidth: '1px',
											borderRadius: '12px',
											padding: '12.5px 15px',
										}}
										onChange={(e: any) => {
											if (
												e.target.value !== '' &&
												Number(e.target.value) < 0
											) {
												setValue('minPrice', '0');
											}
										}}
									/>

									<Typography variant="body1">to</Typography>

									<FieldInput
										id="max-price"
										type="number"
										placeholder="Max"
										registerHookForm={{ ...register('maxPrice') }}
										sx={{
											borderWidth: '1px',
											borderRadius: '12px',
											padding: '12.5px 15px',
										}}
										onChange={(e: any) => {
											if (
												e.target.value !== '' &&
												Number(e.target.value) < 0
											) {
												setValue(
													'maxPrice',
													Math.abs(e.target.value).toString()
												);
											}
										}}
									/>
								</Stack>

								{/* <DividerGradient sx={{ mt: 1 }} /> */}

								<DropdownButtonGroup>
									<ButtonWhite onClick={handleClear} sx={{ width: '130px' }}>
										Clear
									</ButtonWhite>
									<ButtonWhite type="submit" sx={{ width: '130px' }}>
										Apply
									</ButtonWhite>
								</DropdownButtonGroup>
							</DropdownWrapper>
						</form>
					</ClickAwayListener>
				)}
			</Box>
		</>
	);
};

export default FilterPrice;
