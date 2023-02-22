/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Stack, Box, Grid, Typography, CircularProgress, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AutoCompleteCustom from 'components/CustomField/AutoCompleteCustom';
import { SelectAndInputWraper, Title } from 'components/Marketplace/SellItemPage/Styled';
import FieldInput from 'components/CustomField/FieldInput';
import DateTimeCustomPicker from 'customComponents/DateTimePickerCustom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { createOrder, selectOrder } from 'redux/slices/sellItem';
import { ListTokenPaymentTestNet } from 'constants/sellItem';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import { selectUser } from 'redux/slices/userInfo';
import { useParams } from 'react-router-dom';
import { selectAllNfts } from 'redux/slices/nftFilter';
import { nftItem } from 'models/item';
import { getBalanceToken } from 'service/aptos.service';
import useBuyItemAptos from 'utils/marketplace';
import { setCurrentPaymentToken, setPriceOrder } from 'redux/slices/sellItem';
import useTransfer from 'utils/transfer';
import { async } from '@firebase/util';
export interface IFormSellItemInputs {
	price: string;
	currentPaymentToken: any;
	quantity: string;
	startTime: number;
	endTime: number;
}

const FormSellFixPrice = () => {
	const { checkCoinStore } = useTransfer();
	const dispatch = useAppDispatch();
	const { itemId } = useParams();
	const userInfo = useAppSelector(selectUser);
	const nftItem: nftItem = useAppSelector(selectAllNfts).filter(
		(item: nftItem) => item._id === itemId
	)[0];
	const {
		sellItemAptos,
		price,
		setPrice,
		statusList,
		handleValidateAmount,
		setStartTime,
		setExpirationTime,
		setWithdrawExpirationTime,
		setCoinType,
	} = useBuyItemAptos(nftItem!);
	const [init, setInit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [tokenPayment, setTokenPayment] = React.useState<any>(null);
	const [amountOwned, setAmountOwned] = useState<string>('0');
	const schema = yup
		.object({
			price: yup.number().required('Required').min(0).typeError('You must specify a number'),
			currentPaymentToken: yup.object().required('Required'),
			quantity: yup
				.number()
				.required('Required')
				.min(0)
				.max(Number(amountOwned), 'max')
				.typeError('You must specify a number'),
			startTime: yup.number().required('Required'),
			endTime: yup.number().required('Required'),
		})
		.required();
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<IFormSellItemInputs>({
		resolver: yupResolver(schema),
	});
	//function
	async function handleChangePaymentToken(tokenPayment: any) {
		if (tokenPayment) {
			console.log(tokenPayment);

			if (await checkCoinStore(userInfo!.userAddress, tokenPayment.type)) {
				setValue('currentPaymentToken', tokenPayment);
				dispatch(setCurrentPaymentToken(tokenPayment));
				setTokenPayment(tokenPayment);
				setCoinType(tokenPayment);
				clearErrors('currentPaymentToken');
			} else {
				setTokenPayment(null);
				setCoinType(null);
				dispatch(setCurrentPaymentToken(null));
				setValue('currentPaymentToken', null);
				setError('currentPaymentToken', {
					message: 'You do not have enough coins to pay for this item',
				});
			}
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
	function onSubmit(data: IFormSellItemInputs) {
		setStartTime(data.startTime.toString());
		setWithdrawExpirationTime((data.endTime + 5 * 60000).toString());
		setExpirationTime(data.endTime.toString());
		setInit(true);
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
		if (init) {
			sellItemAptos();
		} else {
			dispatch(createOrder(data));
		}
	}

	useEffect(() => {
		if (userInfo?.userAddress && nftItem) {
			getAmountOwn();
		}
	}, [userInfo?.userAddress, nftItem]);
	useEffect(() => {
		setValue('startTime', new Date(new Date().getTime()).getTime());
		setValue(
			'endTime',
			new Date(new Date().getTime() + 7 * 24 * 60 * 60000 + 5 * 60000).getTime()
		);
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
									value={price}
									onChange={(e: any) => {
										if (Number(e.target.value) < 0) {
											let a = -Number(e.target.value);
											setPrice(a.toString());
											dispatch(setPriceOrder(a.toString()));
										} else {
											setPrice(e.target.value);
											dispatch(setPriceOrder(e.target.value));
										}
									}}
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
								onChange={(e: any) => {
									handleValidateAmount(e, amountOwned!);
								}}
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
						<DateTimeCustomPicker
							setValue={setValue}
							setStartTime={setStartTime}
							setWithdrawExpirationTime={setWithdrawExpirationTime}
							setExpirationTime={setExpirationTime}
						/>
						<Box sx={{ width: '100%' }}>
							{errors.startTime?.message && (
								<Typography
									variant="body1"
									sx={{ color: 'red', pt: 1, float: 'right' }}
								>
									<>{errors.startTime?.message}</>
								</Typography>
							)}
							{errors.endTime?.message && (
								<Typography
									variant="body1"
									sx={{ color: 'red', pt: 1, float: 'right' }}
								>
									<>{errors.endTime?.message}</>
								</Typography>
							)}
						</Box>
					</Box>
					{init ? (
						<>
							{loading ? (
								<ButtonWhite sx={{ margin: '0 auto' }}>
									<CircularProgress sx={{ color: 'black', mr: 1 }} size={25} />
								</ButtonWhite>
							) : (
								<ButtonWhite type="submit">Confirm</ButtonWhite>
							)}
						</>
					) : (
						<ButtonWhite type="submit">Sell Item</ButtonWhite>
					)}
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
