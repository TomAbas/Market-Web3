import { Box, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useControlModal from 'hooks/useControlModal';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useAppDispatch } from '../../../redux/hooks';
import { openFirstModal } from '../../../redux/slices/modalWallet';
import ModalBuy from 'components/ModalBuy/ModalBuy';

const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL;
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_RESOURCE_ADDRESS = process.env.REACT_APP_MARKET_RESOURCE_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
const DECIMAL = 100000000;

export default function DetailCard() {
	const search = useLocation().search;
	const id = new URLSearchParams(search).get('id');
	const { account, signAndSubmitTransaction } = useWallet();
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
				statusBuyNft.isSuccess ? 'Congrat' : statusBuyNft.isError && 'Something went wrong'
			}`,
			description: `${
				statusBuyNft.isSuccess ? 'You bought your NFT' : statusBuyNft.isError && 'Try again'
			}`,
		},
	];
	useEffect(() => {
		const fetchOffers = async () => {
			const response: any = await axios.get(
				`${APTOS_NODE_URL}/accounts/${MARKET_RESOURCE_ADDRESS}/resource/${MARKET_ADDRESS}::market::TokenInfo`
			);
			const offers = response.data.data?.token_list;
			const newItem = offers.find((item: any, index: any) => index == id);
			setItem(newItem);
		};
		fetchOffers();
	}, []);

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
	return (
		<>
			<Box sx={{ pt: 16, pb: 4, maxWidth: '1440px', mx: 'auto' }}>
				<Stack direction="row">
					<Box sx={{ width: '50%', img: { width: '100%' } }}>
						<img src={item?.uri} alt="item" />
					</Box>
					<Stack gap="10px" sx={{ width: '50%' }}>
						<Typography variant="h5" fontWeight={500}>
							{item?.token_id.token_data_id.name}
						</Typography>
						<Typography variant="body1">
							Owner:{' '}
							<a
								href={`https://explorer.aptoslabs.com/account/${item?.owner}`}
								target="_blank"
							>
								{item?.owner.slice(0, 6) +
									'...' +
									item?.owner.slice(item?.owner.length - 4, item?.owner.length)}
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
						<Typography variant="body1">Price: {item?.price / DECIMAL} APT</Typography>
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
							<button onClick={handleOpenModalBuy}>Buy now</button>
						</Box>
					</Stack>
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
