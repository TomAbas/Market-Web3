/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, Typography, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { useNavigate, useOutletContext, useLocation, useParams } from 'react-router-dom';
import useControlModal from 'hooks/useControlModal';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { openFirstModal } from '../../../redux/slices/modalWallet';
import ModalBuy from 'components/ModalBuy/ModalBuy';
import ModalSell from 'components/ModelSell/ModelSell';
// import { getListItemResource } from '../../../utils/dataResource';
import { ItemImage } from '../styled';
import { toast } from 'react-toastify';
import { buyItem, cancelOrder } from '../../../api/collections/collectionApi';
import MediaDisplayCard from '../MediaDisplayCard/MediaDisplayCard';
import defaultImg from '../../../assets/icons/default-img-input2.png';
import { getItemDetail } from 'api/items/itemsApi';
import { nftItem } from 'models/item';
import useBuyItemAptos from 'utils/putAptos';
import { changePriceToToken } from 'utils/function';
import { selectListNftOrders } from 'redux/slices/orderResource';
import { getItemFromOrder } from 'utils/dataResource';
import { selectUser } from 'redux/slices/userInfo';
import TabItemDetail from './TabItemDetail/TabItemDetail';
import { getBalanceToken } from 'service/aptos.service';

export default function DetailCard() {
	let { itemId } = useParams();
	const search = useLocation().search;
	const [item, setItem] = useState<nftItem>();
	const [loadingItem, setLoadingItem] = useState(true);
	const [itemPrice, setItemPrice] = useState<number>();
	const [itemResource, setItemResource] = useState<any>();
	const [userAmountOfItem, setUserAmountOfItem] = useState('');
	const {
		buyItemAptos,
		handleWithdrawItem,
		statusWithdraw,
		sellItemAptos,
		setPrice,
		price,
		supply,
		statusList,
		handleValidateAmount,
	} = useBuyItemAptos(item!);
	const navigate = useNavigate();
	const listNftOrders = useAppSelector(selectListNftOrders);
	const userInfo = useAppSelector(selectUser);
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
		setItemResource(getItemFromOrder(listNftOrders, item!));
	}
	async function getUserAmountOfItem(item: nftItem) {
		setUserAmountOfItem(
			await getBalanceToken(
				userInfo?.userAddress!,
				item.creator,
				item.collectionInfo.collectionName!,
				item.itemName,
				item.chainId
			)
		);
	}
	useEffect(() => {
		if (userInfo && item?.itemName) {
			getUserAmountOfItem(item);
		}
	}, [userInfo, item]);
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
										Sell Quantity : {itemResource?.amount}
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
											{itemResource?.owner != userInfo?.userAddress ? (
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
										<>
											{item?.owner.includes(userInfo?.userAddress!) && (
												<button onClick={handleOpenModalBuy}>
													Sell item
												</button>
											)}
										</>
									)}
								</Box>
							</Stack>
						</>
					)}
				</Stack>
				<Box>
					<TabItemDetail userAmountOfItem={userAmountOfItem} item={item!} />
				</Box>
			</Box>
			{item?.status === 1 ? (
				<ModalBuy
					title="Buy Item"
					openState={openModalBuy}
					closeModal={() => handleCloseModalBuy(handleNavigate(statusBuyNft.isSuccess))}
					funcBuyNft={claimOffer}
					activeStep={activeStep}
					statusBuyNft={statusBuyNft}
					steps={steps}
				/>
			) : (
				<ModalSell
					open={openModalBuy}
					handleClose={handleCloseModalBuy}
					handleListItem={sellItemAptos}
					setPrice={setPrice}
					price={price}
					supply={supply}
					statusList={statusList}
					handleValidateAmount={handleValidateAmount}
				/>
			)}
		</>
	);
}

/* <Box mt={3}>
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
				</Box> */
