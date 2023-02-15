/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, Typography, Skeleton, Grid } from '@mui/material';
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
import ItemInfo from './ItemInfo/ItemInfo';
import { selectTrigger } from 'redux/slices/nftFilter';
import MoreItem from './MoreItem/MoreItem';
import useGetItemCollection from 'hooks/useGetItemCollection';
import SkeletonCardNft from 'components/Skeletons/SkeletonCardNft';
export default function DetailCard() {
	let { itemId } = useParams();
	const [item, setItem] = useState<nftItem>();
	const { collectionInfo } = useGetItemCollection(item?.collectionInfo?._id);
	const [loadingItem, setLoadingItem] = useState(true);
	const [itemPrice, setItemPrice] = useState<number>(0);
	const [itemResource, setItemResource] = useState<any>();
	const [userAmountOfItem, setUserAmountOfItem] = useState('');
	const trigger = useAppSelector(selectTrigger);
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
			label: 'Confirm Order',
			description: 'Please confirm your order',
		},
		{
			label: `${
				statusBuyNft.isSuccess
					? 'Congrats'
					: statusBuyNft.isError
					? 'Something Went Wrong'
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
		navigate(`/collection-detail/${item?.collectionId}`);
	};
	function changePrice(item: nftItem) {
		setItemPrice(changePriceToToken(item.price));
	}
	async function getUserAmountOfItem(item: nftItem) {
		try {
			setUserAmountOfItem(
				await getBalanceToken(
					userInfo?.userAddress!,
					item.creator,
					item.collectionInfo.collectionName!,
					item.itemName,
					item.chainId
				)
			);
		} catch (error) {
			toast.error('Can’t get your balance of Aptos Coin');
		}
	}
	useEffect(() => {
		if (item?.status === 1 && listNftOrders.length > 0) {
			setItemResource(getItemFromOrder(listNftOrders, item!));
		} else {
			setItemResource(null);
		}
	}, [listNftOrders, item]);
	useEffect(() => {
		if (userInfo && item?.itemName) {
			getUserAmountOfItem(item);
		}
	}, [userInfo, item]);
	useEffect(() => {
		fetchOffers();
	}, [itemId, trigger]);
	return (
		<>
			<Box sx={{ pt: 16, pb: 4, maxWidth: '1440px', mx: 'auto', px: 2 }}>
				<Stack direction="row" gap={4}>
					<ItemInfo
						itemResource={itemResource}
						loadingItem={loadingItem}
						item={item}
						handleOpenModalBuy={handleOpenModalBuy}
						handleWithdrawItem={handleWithdrawItem}
						userInfo={userInfo}
						statusWithdraw={statusWithdraw}
						itemPrice={itemPrice}
						userAmountOfItem={Number(userAmountOfItem)}
					/>
				</Stack>
				<Box>
					<TabItemDetail userAmountOfItem={userAmountOfItem} item={item!} />
				</Box>
				<Box sx={{ mt: 5 }}>
					<Typography variant="h3" sx={{ textAlign: 'center', fontWeight: '700' }}>
						More From This Collection
					</Typography>

					<Box sx={{ mt: 5, px: 1 }}>
						{collectionInfo ? (
							<MoreItem
								currentItemId={item?._id}
								collection={collectionInfo}
								loadingCollectionImg={loadingCollectionImg}
							/>
						) : (
							<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
								{new Array(4).fill(null).map((item, idx) => (
									<SkeletonCardNft key={idx} />
								))}
							</Grid>
						)}
					</Box>
				</Box>
			</Box>
			{item?.status === 1 ? (
				<ModalBuy
					title="Buy Item"
					itemPrice={itemPrice}
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
					userAmountOfItem={userAmountOfItem}
					handleValidateAmount={handleValidateAmount}
					royaltyFee={item?.royalties.toString()!}
				/>
			)}
		</>
	);
}
