/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Stack, Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AutoCompleteCustom from 'components/CustomField/AutoCompleteCustom';
import { SelectAndInputWraper, Title } from 'components/Marketplace/SellItemPage/Styled';
import FieldInput from 'components/CustomField/FieldInput';
import DateTimeCustomPicker from 'customComponents/DateTimePickerCustom';
import { useAppSelector } from 'redux/hooks';
import { selectOrder } from 'redux/slices/sellItem';
import { ListTokenPaymentTestNet } from 'constants/sellItem';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import { selectUser } from 'redux/slices/userInfo';
import { useParams } from 'react-router-dom';
import { selectAllNfts } from 'redux/slices/nftFilter';
import { nftItem } from 'models/item';
import { getBalanceToken } from 'service/aptos.service';
export interface IFormSellItemInputs {
	price: string;
	currentPaymentToken: object;
	quantity: string;
	startTime: number;
}

const FormSellFixPrice = () => {
	const { itemId } = useParams();
	const userInfo = useAppSelector(selectUser);
	const nftItem: nftItem = useAppSelector(selectAllNfts).filter(
		(item: nftItem) => item._id === itemId
	)[0];
	const [tokenPayment, setTokenPayment] = React.useState<any>(null);
	const [amountOwned, setAmountOwned] = useState<string>();
	const pickedStartTime = useAppSelector(selectOrder).startTime;
	const orderSell = useAppSelector(selectOrder);
	const schema = yup
		.object({
			price: yup.number().required('Required').min(0).typeError('You must specify a number'),
			currentPaymentToken: yup.string().required('Required'),
			quantity: yup
				.number()
				.required('Required')
				.min(0)
				.max(10, 'max')
				.typeError('You must specify a number'),
			startTime: yup
				.number()
				.required('Required')
				.min(new Date().getTime(), 'Must be in future')
				.typeError('Must in future'),
		})
		.required();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<IFormSellItemInputs>({
		resolver: yupResolver(schema),
	});
	//function
	function handleChangePaymentToken(tokenPayment: any) {
		if (tokenPayment) {
			setTokenPayment(tokenPayment);
			setValue('currentPaymentToken', tokenPayment.name);
		} else {
			setTokenPayment(null);
		}
	}
	async function getAmountOwn() {
		try {
			setAmountOwned(
				await getBalanceToken(
					userInfo?.userAddress!,
					nftItem.creator,
					nftItem.collectionInfo.collectionName,
					nftItem.itemName,
					nftItem.chainId
				)
			);
		} catch (error) {
			setAmountOwned('0');
			console.log(error);
		}
	}
	function onSubmit(data: any) {
		console.log(data);
	}

	useEffect(() => {
		console.log(nftItem);
		console.log(userInfo);
		if (userInfo?.userAddress && nftItem) {
			getAmountOwn();
		}
	}, [userInfo?.userAddress, nftItem]);
	useEffect(() => {
		setValue('startTime', new Date(new Date().getTime() + 5 * 60000).getTime());
	}, []);
	useEffect(() => {
		console.log(amountOwned);
	}, [amountOwned]);

	return (
		<>
			<Stack spacing={3}>
				{/*-------------------------------Price-------------------------------- */}
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={{ width: '100%' }}>
						<Title variant="h6">Price</Title>
						<SelectAndInputWraper>
							<Box sx={{ flexGrow: 1 }}>
								<FieldInput
									id="price"
									type="number"
									placeholder="0.0"
									// onChange={setFixedPrice}
									sx={{
										border: 'none',
										textAlign: 'left',
										fontSize: '16px',
										textOverflow: 'ellipsis',
										background: '#fff',
										padding: '12px 0 12px 15px',
										boxShadow: 0,
									}}
									otherProps={{
										inputMode: 'decimal',
										pattern: '^[0-9]*[.,]?[0-9]*$',
										minLength: 1,
										maxLength: 10,
									}}
									registerHookForm={{ ...register('price') }}
								/>
							</Box>
							<Box>
								<AutoCompleteCustom
									{...register('currentPaymentToken')}
									currentItem={tokenPayment}
									listItem={ListTokenPaymentTestNet}
									onChange={handleChangePaymentToken}
									placeholder="Token name"
									// disabled={!state.feeMethod}
									sx={{
										width: '155px',
										input: {
											padding: '15px 5px 15px 0',
										},
									}}
								/>
							</Box>
						</SelectAndInputWraper>
						<Stack
							direction={'row'}
							justifyContent={'space-between'}
							sx={{ width: '100%' }}
						>
							{errors.price?.message && (
								<Typography
									variant="body1"
									sx={{ color: 'red', pt: 1, float: 'right', width: '100%' }}
								>
									<>{errors.price?.message}</>
								</Typography>
							)}
							<Box sx={{ width: '100%' }}>
								{errors.currentPaymentToken?.message && (
									<Typography
										variant="body1"
										sx={{ color: 'red', pt: 1, float: 'right' }}
									>
										<>{errors.currentPaymentToken?.message}</>
									</Typography>
								)}
							</Box>
						</Stack>

						<Box sx={{ mt: 2 }}>
							<Title variant="h6">Quantity</Title>
							<Typography variant="body2" sx={{ mb: 0.5, opacity: 0.7 }}>
								{amountOwned} available
							</Typography>
							<FieldInput
								registerHookForm={{ ...register('quantity') }}
								id="quantity"
								type="number"
								placeholder="Ex: 1, 2,..."
								// onChange={setQuantity}
								sx={{
									fontSize: '16px',
									textOverflow: 'ellipsis',
									background: '#fff',
									padding: '14px 10px',
								}}
							/>
							{errors.quantity && (
								<Typography
									variant="body1"
									sx={{ color: 'red', pt: 1, float: 'right' }}
								>
									{errors.quantity?.message}
								</Typography>
							)}
						</Box>
					</Box>
					<Box>
						<Title variant="h6" sx={{ pb: 1 }}>
							Duration
						</Title>
						<DateTimeCustomPicker setValue={setValue} />
						<Box sx={{ width: '100%' }}>
							{errors.startTime?.message && (
								<Typography
									variant="body1"
									sx={{ color: 'red', pt: 1, float: 'right' }}
								>
									<>{errors.startTime?.message}</>
								</Typography>
							)}
						</Box>
					</Box>
					<ButtonWhite type="submit">SELLLLLLL</ButtonWhite>
				</form>
			</Stack>
		</>
	);
};

export default FormSellFixPrice;

{
	/*-------------------------------Fee method-------------------------------- */
}
{
	/* <Stack direction="row" alignItems="center" justifyContent="space-between">
				<Box>
					<Typography variant="h6">Fee method</Typography>
					<Typography variant="body2" sx={{ opacity: '0.5' }}>
						({state.feeMethod ? 'Split Fee' : 'Protocol Fee'})
					</Typography>
				</Box>

				<SwitchButton onChange={handleChangeFeeMethod} />
			</Stack> */
}
