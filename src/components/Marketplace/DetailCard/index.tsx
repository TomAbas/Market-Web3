/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, Typography, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import useControlModal from 'hooks/useControlModal';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useAppDispatch } from '../../../redux/hooks';
import { openFirstModal } from '../../../redux/slices/modalWallet';
import ModalBuy from 'components/ModalBuy/ModalBuy';
// import { getListItemResource } from '../../../utils/dataResource';
import { ItemImage } from '../styled';
import MediaDisplayCard from '../MediaDisplayCard/MediaDisplayCard';
import defaultImg from '../../../assets/icons/default-img-input2.png';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
const DECIMAL = 100000000;

export default function DetailCard() {
	const search = useLocation().search;
	const creator = decodeURIComponent(new URLSearchParams(search).get('creator') || '');
	const collection = decodeURIComponent(new URLSearchParams(search).get('collection') || '');
	const name = decodeURIComponent(new URLSearchParams(search).get('name') || '');
	const [offers, setOffers, loading] = useOutletContext<any>();
	const { account, signAndSubmitTransaction } = useWallet();
	const [statusWithdraw, setStatusWithdraw] = useState('Cancel');
	const dispatch = useAppDispatch();
	let navigate = useNavigate();
	const [item, setItem] = useState<any>();
	const {
		handleNext,
		handleOpenModalBuy,
		handleCloseModalBuy,
		startLoading,
		completeTaskSuccess,
		failToComplete,
		openModalBuy,
		activeStep,
		statusBuyNft,
	} = useControlModal();
	const steps = [
		{
			label: 'Confirm order',
			description: 'Please confirm your order',
		},
		{
			label: `${
				statusBuyNft.isSuccess
					? 'Congrat'
					: statusBuyNft.isError
					? 'Something went wrong'
					: 'Result'
			}`,
			description: `${
				statusBuyNft.isSuccess
					? 'You bought your NFT'
					: statusBuyNft.isError
					? 'Try again'
					: '123'
			}`,
		},
	];
	useEffect(() => {
		const fetchOffers = async () => {
			const newItem = offers.find(
				(item: any) =>
					item.token_id.token_data_id.creator === creator &&
					item.token_id.token_data_id.collection === collection &&
					item.token_id.token_data_id.name === name
			);
			setItem(newItem);
		};
		fetchOffers();
	}, [offers]);

	const claimOffer = async () => {
		if (!account) {
			dispatch(openFirstModal());
			return;
		}
		startLoading();
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::market::buy_token`,
				type_arguments: [MARKET_COINT_TYPE || '0x1::aptos_coin::AptosCoin'],
				arguments: [
					item?.token_id.token_data_id.creator,
					item?.token_id.token_data_id.collection,
					item?.token_id.token_data_id.name,
					item?.token_id.property_version,
				],
			};

			await signAndSubmitTransaction(payload, { gas_unit_price: 100 });
			completeTaskSuccess();
			handleNext();
			navigate('/profile');
		} catch {
			failToComplete();
			handleNext();
		}
	};

	const navigateCollection = () => {
		// console.log(name, creater);
		navigate(
			`/collection-detail?creator=${new URLSearchParams(search).get(
				'creator'
			)}&collection=${new URLSearchParams(search).get('collection')}`
		);
	};

	const handleWithdrawItem = async () => {
		if (!account) {
			dispatch(openFirstModal());
			return;
		}
		setStatusWithdraw('...');
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::market::withdraw_token`,
				type_arguments: [MARKET_COINT_TYPE || '0x1::aptos_coin::AptosCoin'],
				arguments: [
					item?.token_id.token_data_id.creator,
					item?.token_id.token_data_id.collection,
					item?.token_id.token_data_id.name,
					item?.token_id.property_version,
				],
			};

			await signAndSubmitTransaction(payload, { gas_unit_price: 100 });
			navigate('/profile');
		} catch {
			setStatusWithdraw('Cancel');
		}
	};

	return (
		<>
			<Box sx={{ pt: 16, pb: 4, maxWidth: '1440px', mx: 'auto', px: 2 }}>
				<Stack direction="row" gap={4}>
					{loading ? (
						<>
							<Box>
								<Skeleton sx={{ width: '100%', transform: 'translateY(0px)' }}>
									<ItemImage sx={{ width: '50%', paddingTop: '0' }}>
										<Box
											className="main-img"
											sx={{ width: '600px', height: '600px' }}
										>
											<img src={item?.uri} alt="item" />
										</Box>
									</ItemImage>
								</Skeleton>
							</Box>
							<Stack gap="16px" sx={{ width: '50%' }}>
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
								<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
							</Stack>
						</>
					) : (
						<>
							<ItemImage sx={{ width: '50%', paddingTop: '50%' }}>
								<Box className="main-img">
									{/* <img src={item?.uri} alt="item" /> */}
									<MediaDisplayCard
										media={item?.uri}
										preview={defaultImg}
										name={item?.token_id.token_data_id.name}
									/>
								</Box>
							</ItemImage>
							<Stack gap="16px" sx={{ width: '50%' }}>
								<Typography
									variant="h6"
									fontWeight={500}
									sx={{ color: '#007aff', cursor: 'pointer' }}
									onClick={navigateCollection}
								>
									{item?.token_id.token_data_id.collection}
								</Typography>
								<Typography variant="h4" fontWeight={500}>
									{item?.token_id.token_data_id.name}
								</Typography>
								<p>{item?.description}</p>

								<p>Owned Quantity : {item?.amount}</p>
								<Typography variant="body1">
									Owner:{' '}
									<a
										href={`https://explorer.aptoslabs.com/account/${item?.owner}`}
										target="_blank"
									>
										{item?.owner.slice(0, 6) +
											'...' +
											item?.owner.slice(
												item?.owner.length - 4,
												item?.owner.length
											)}
									</a>
								</Typography>
								<Typography variant="body1">
									Creator:
									<a
										href={`https://explorer.aptoslabs.com/account/${item?.token_id.token_data_id.creator}`}
										target="_blank"
									>
										{item?.token_id.token_data_id.creator.slice(0, 6) +
											'...' +
											item?.token_id.token_data_id.creator.slice(
												item?.token_id.token_data_id.creator.length - 4,
												item?.token_id.token_data_id.creator.length
											)}
									</a>
								</Typography>
								<Typography variant="body1">
									Price: {item?.price / DECIMAL} APT
								</Typography>
								<Box
									sx={{
										button: {
											padding: '10px 30px',
											border: '1.5px solid #e7e8ec',
											transition: 'all 0.4s',
											borderRadius: '12px',
											fontWeight: 500,
											background: '#fff',
											fontSize: '20px',
											cursor: 'pointer',
											fontFamily: 'Montserrat, sans-serif !important',
											fontStyle: 'italic !important',
											width: '180px',
											'&:hover': {
												background: '#007aff',
												borderColor: 'transparent',
												color: '#fff',
											},
										},
									}}
								>
									{item?.owner != account?.address ? (
										item?.is_cancle == false && (
											<button onClick={handleOpenModalBuy}>Buy now</button>
										)
									) : (
										<>
											<button onClick={handleWithdrawItem}>
												{statusWithdraw}
											</button>
										</>
									)}
								</Box>
							</Stack>
						</>
					)}
				</Stack>
				{/* <Box mt={3}>
					<Box sx={{ textAlign: 'center', mb: 3 }}>
						<Typography variant="h4" fontWeight={500}>
							History
						</Typography>
					</Box>
					<Stack gap="10px">
						<Stack
							direction="row"
							gap={1}
							alignItems="center"
							sx={{
								padding: '6px 24px',
								background: '#fff',
								border: '1.5px solid #E7E8EC',
								borderRadius: '12px',
							}}
						>
							<Box
								sx={{ img: { width: '42px', height: '42px', borderRadius: '50%' } }}
							>
								<img src={item} alt="avatar" />
							</Box>
							<Box>
								<Typography variant="body1">Address: 0x000000...000</Typography>
							</Box>
						</Stack>
					</Stack>
				</Box> */}
			</Box>
			<ModalBuy
				title="Buy Item"
				openState={openModalBuy}
				closeModal={handleCloseModalBuy}
				funcBuyNft={claimOffer}
				activeStep={activeStep}
				statusBuyNft={statusBuyNft}
				steps={steps}
			/>
		</>
	);
}
