/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, Typography, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useNavigate, useOutletContext, useLocation, useParams } from 'react-router-dom';
import useControlModal from 'hooks/useControlModal';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useAppDispatch } from '../../../redux/hooks';
import { openFirstModal } from '../../../redux/slices/modalWallet';
import ModalBuy from 'components/ModalBuy/ModalBuy';
// import { getListItemResource } from '../../../utils/dataResource';
import { ItemImage } from '../styled';
import { toast } from 'react-toastify';
import { buyItem, cancelOrder } from '../../../api/collectionApi';
import MediaDisplayCard from '../MediaDisplayCard/MediaDisplayCard';
import defaultImg from '../../../assets/icons/default-img-input2.png';
import { getItemDetail } from 'api/items/itemsApi';
import { nftItem } from 'models/item';
import useBuyItemAptos from 'utils/putAptos';
import { getBalanceToken } from 'service/aptos.service';
import { changePriceToToken } from 'utils/function';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_RESOURCE_ADDRESS = process.env.REACT_APP_MARKET_RESOURCE_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
const DECIMAL = 100000000;

export default function DetailCard() {
	let { itemId } = useParams();
	const search = useLocation().search;
	const creator = decodeURIComponent(new URLSearchParams(search).get('creator') || '');
	const collection = decodeURIComponent(new URLSearchParams(search).get('collection') || '');
	const name = decodeURIComponent(new URLSearchParams(search).get('name') || '');
	const [offers] = useOutletContext<any>();
	const { account, signAndSubmitTransaction } = useWallet();
	const [statusWithdraw, setStatusWithdraw] = useState('Cancel');
	const dispatch = useAppDispatch();
	let navigate = useNavigate();
	const [item, setItem] = useState<nftItem>();
	const [amountItemResource, setAmountItemResource] = useState('');
	const [loadingItem, setLoadingItem] = useState(true);
	const [itemPrice, setItemPrice] = useState<number>();
	const { buyItemAptos } = useBuyItemAptos(item!);
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
					? 'Congrats'
					: statusBuyNft.isError
					? 'Something went wrong'
					: 'Result'
			}`,
			description: `${
				statusBuyNft.isSuccess
					? 'Successfully bought NFT item'
					: statusBuyNft.isError
					? 'Try again'
					: '123'
			}`,
		},
	];
	const handleNavigate = (status: boolean) => {
		if (status) {
			navigate('/profile');
		}
	};
	const fetchOffers = async () => {
		try {
			let item = await getItemDetail(itemId!).then((res) => res.data);
			getAmountItemResoucre(item);
			changePrice(item);
			setItem(item);
		} catch (error) {
			navigate('/');
		} finally {
			setLoadingItem(false);
		}
	};

	const claimOffer = async () => {
		await buyItemAptos(handleNext, startLoading, failToComplete, completeTaskSuccess);
	};

	const navigateCollection = () => {
		// console.log(name, creater);
		navigate(
			`/collection-detail?creator=${new URLSearchParams(search).get(
				'creator'
			)}&collection=${new URLSearchParams(search).get('collection')}`
		);
	};
	function changePrice(item: nftItem) {
		setItemPrice(changePriceToToken(item.price));
	}
	async function getAmountItemResoucre(item: nftItem) {
		try {
			console.log(MARKET_ADDRESS);
			console.log(item);
			const amountSell = await getBalanceToken(
				item.status === 1
					? '0xed08f5856d2e5a1ab7282964922b7ec8c18b85c911d99b3f23eb25af5965d270'!
					: item.owner[0],
				item.creator,
				item.collectionInfo.collectionName!,
				item.itemName,
				'2'
			);
			console.log(amountSell);
			setAmountItemResource(amountSell);
		} catch (error) {}
	}
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
					item?.creator,
					item?.collectionInfo.collectionName,
					item?.itemName,
					'0',
				],
			};

			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				let listItem: any = {
					maker: account?.address?.toString(),
					chainId: '2',
					price: item?.price,
					quantity: amountItemResource,
					to: MARKET_ADDRESS,
					txHash: res.hash,
					itemName: name,
					collectionName: collection,
					creator: creator,
					owner: item?.owner,
				};
				cancelOrder(listItem);
			});

			toast.success('Successfully canceled listing');
			navigate('/profile');
		} catch {
			setStatusWithdraw('Cancel');
		}
	};

	useEffect(() => {
		fetchOffers();
	}, [itemId]);
	return (
		<>
			<Box sx={{ pt: 16, pb: 4, maxWidth: '1440px', mx: 'auto', px: 2 }}>
				<Stack direction="row" gap={4}>
					{loadingItem ? (
						<>
							<Box>
								<Skeleton sx={{ width: '100%', transform: 'translateY(0px)' }}>
									<ItemImage sx={{ width: '50%', paddingTop: '0' }}>
										<Box
											className="main-img"
											sx={{ width: '600px', height: '600px' }}
										>
											<img src={item?.itemMedia} alt="item" />
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
									<MediaDisplayCard
										media={item!.itemMedia}
										preview={defaultImg}
										name={item!.itemName}
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
									{item?.collectionInfo.collectionName}
								</Typography>
								<Typography variant="h4" fontWeight={500}>
									{item?.itemName}
								</Typography>
								<Typography variant="body1">{item?.description}</Typography>
								{item?.status === 1 && (
									<Typography variant="body1">
										Owned Quantity : {amountItemResource}
									</Typography>
								)}
								<Typography variant="body1">
									Owner:{' '}
									<a
										href={`https://explorer.aptoslabs.com/account/${item?.owner}`}
										target="_blank"
									>
										{item!.owner.length > 0
											? item?.owner[0].slice(0, 6) +
											  '...' +
											  item?.owner[0].slice(
													item?.owner[0].length - 4,
													item?.owner[0].length
											  )
											: ''}
									</a>
								</Typography>
								<Typography variant="body1">
									Creator:
									<a
										href={`https://explorer.aptoslabs.com/account/${item?.creator}`}
										target="_blank"
									>
										{item?.creator.slice(0, 6) +
											'...' +
											item?.creator.slice(
												item?.creator.length - 4,
												item?.creator.length
											)}
									</a>
								</Typography>
								{item?.status === 1 && (
									<Typography variant="body1">Price: {itemPrice} APT</Typography>
								)}

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
									{item?.status === 1 ? (
										<>
											{item?.owner[0] != account?.address ? (
												<button onClick={handleOpenModalBuy}>
													Buy now
												</button>
											) : (
												<button onClick={handleWithdrawItem}>
													{statusWithdraw}
												</button>
											)}
										</>
									) : (
										<></>
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
				closeModal={() => handleCloseModalBuy(handleNavigate(statusBuyNft.isSuccess))}
				funcBuyNft={claimOffer}
				activeStep={activeStep}
				statusBuyNft={statusBuyNft}
				steps={steps}
			/>
		</>
	);
}
