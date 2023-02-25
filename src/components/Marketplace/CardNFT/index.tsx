/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useNavigate } from 'react-router-dom';
import { openFirstModal } from '../../../redux/slices/modalWallet';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
	AvatarIcon,
	BoxCountDown,
	ErrorContent,
	GradIcon,
	ImageBlockchain,
	ItemCardStyle,
	ItemContent,
	ContentFooter,
	ItemImage,
	PriceChangeStyle,
	PriceStyle,
	StackCard,
	ItemFavorite,
	IconFavorite,
	DropDownWrapper,
	DropDownOption,
	LinkWrapper,
} from './styled';
import TwitterIcon from '../../../assets/icons/twitter-white.svg';
import HeartFullRed from '../../../assets/icons/heart-full-red.svg';
import HeartFullWhite from '../../../assets/icons/heart-full-white.svg';
import aptos from '../../../assets/images/card/aptos.jpg';
import ModalBuy from 'components/ModalBuy/ModalBuy';
import useControlModal from 'hooks/useControlModal';
import { toast } from 'react-toastify';
import MediaDisplayCard from '../MediaDisplayCard/MediaDisplayCard';
import { buyItem } from '../../../api/collections/collectionApi';
import { changePriceToToken } from 'utils/function';
import { useEffect, useState } from 'react';
import useBuyItemAptos from '../../../utils/putAptos';
import { TwitterShareButton } from 'react-share';
import { RELATED_URLS } from 'constants/index';
import NoMaxWidthTooltip from 'customComponents/LongToolTip/LongToolTip';
import { displayUserFullName, displayUserName } from 'utils/formatDisplay';
import { getItemFromOrder } from 'utils/dataResource';
import ModelSell from 'components/ModelSell/ModelSell';
import ModalListOrder from 'components/ModalListOrder/ModalListOrder';
import { nftItem } from 'models/item';
import { getBalanceToken } from 'service/aptos.service';
import { selectUser } from 'redux/slices/userInfo';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
// const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
const DECIMAL = 100000000;

export default function CardNFT({
	itemLiked,
	likeItem,
	offer,
	offers,
	index,
	loadingOffers,
	isProfile = false,
	listNftOrders,
}: {
	itemLiked: (itemId: string) => boolean;
	likeItem: any;
	offer: any;
	offers: any;
	index: any;
	loadingOffers: any;
	isProfile?: boolean;
	listNftOrders?: any;
}) {
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
	} = useBuyItemAptos(offer);
	const [userAmountOfItem, setUserAmountOfItem] = useState('');
	const [itemPrice, setItemPrice] = useState<number>();
	const userInfo = useAppSelector(selectUser);
	function changePrice() {
		setItemPrice(changePriceToToken(offer.price));
	}
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
					: ''
			}`,
		},
	];
	let navigate = useNavigate();

	const claimOffer = async () => {
		await buyItemAptos(handleNext, startLoading, failToComplete, completeTaskSuccess);
	};

	const handleNavigate = (status: boolean) => {
		if (status) {
			navigate('/profile');
		}
	};

	const handleClickItem = () => {
		navigate(`/item/${offer._id}`);
	};

	const checkSellable = () => {
		if (isProfile && offer?.owner?.includes(userInfo?.userAddress!)) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		changePrice();
	}, [offer]);

	return (
		<>
			<Grid
				item
				xs={12}
				sm={6}
				md={4}
				lg={3}
				spacing={1}
				sx={{ transition: 'all 0.5s ease', animation: '' }}
			>
				<ItemCardStyle sx={{ boxShadow: 0 }}>
					<Box sx={{ p: 1.5, fontStyle: 'italic' }}>
						{/* Item image */}

						<ItemImage>
							<Box className="main-img" onClick={handleClickItem}>
								<MediaDisplayCard
									media={offer?.itemMedia}
									preview={TwitterIcon}
									name={offer?.itemName}
								/>
							</Box>
							{/* Item favorite */}
							<ItemFavorite>
								<Box mr={1.5}>
									<TwitterShareButton
										url={`${RELATED_URLS.MetaSpacecyHomePage}/#/item/${offer?._id}`}
										title={`Look what I found! ${offer?.itemName} collectible`}
										hashtags={['Music', 'Game']}
										via="Metaspacecy"
										style={{ width: '100%', textAlign: 'left' }}
									>
										{' '}
										<img src={TwitterIcon} alt="icon twitter" />
									</TwitterShareButton>
								</Box>
								<Box>
									<Stack direction="row" alignItems="center" spacing={0.5}>
										<Box
											sx={{
												cursor: 'pointer',
											}}
										>
											{itemLiked(offer._id) ? (
												<IconFavorite
													src={HeartFullRed}
													alt="icon favorite"
													onClick={() => {
														likeItem(offer._id, false);
													}}
												/>
											) : (
												<IconFavorite
													src={HeartFullWhite}
													alt="icon favorite"
													onClick={() => {
														likeItem(offer._id, true);
													}}
												/>
											)}
										</Box>
										<Typography variant="body1">{offer.countFav}</Typography>
									</Stack>
								</Box>
							</ItemFavorite>
						</ItemImage>

						{/* Item info */}
						<ItemContent sx={{ pt: 4, height: '120px' }}>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="space-between"
								spacing={1}
							>
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										gap: '8px',
									}}
									onClick={handleClickItem}
								>
									<Typography
										variant="subtitle1"
										fontWeight="500"
										noWrap
										sx={{ cursor: 'pointer', flex: '1' }}
									>
										<NoMaxWidthTooltip
											title={displayUserFullName(offer.itemName)}
										>
											<Typography fontWeight="500" variant="subtitle1" noWrap>
												{offer.itemName}
											</Typography>
										</NoMaxWidthTooltip>
									</Typography>
									<ImageBlockchain>
										<img src={aptos} alt="aptos" />
									</ImageBlockchain>
								</Box>
							</Stack>
							<Box sx={{ height: '21px' }}>
								<Typography fontSize="14px"></Typography>
							</Box>
							<Box>
								<Stack
									direction="row"
									alignItems="end"
									justifyContent="space-between"
									spacing={1}
									sx={{ paddingTop: '15px' }}
								>
									{offer.status === 0 ? (
										<>
											{!isProfile ? (
												<Box sx={{ display: 'flex', gap: '5px' }}>
													<Typography
														variant="subtitle2"
														sx={{
															fontWeight: '300',
														}}
													>
														Unlisted
													</Typography>
												</Box>
											) : (
												<Box></Box>
											)}
										</>
									) : (
										<Box sx={{ display: 'flex', gap: '5px' }}></Box>
									)}
									{checkSellable() ? (
										offer.status === 0 ? (
											<Typography
												onClick={(e) => {
													e.stopPropagation();
													navigate(`/item/sell-item/${offer._id}`);
												}}
												variant="subtitle2"
												sx={{
													color: 'rgb(0, 122, 255)',
													fontWeight: '600',
													'&:hover': {
														opacity: '1',
													},
												}}
											>
												List
											</Typography>
										) : (
											<Typography
												onClick={(e) => {
													e.stopPropagation();
													navigate(`/item/sell-item/${offer._id}`);
												}}
												variant="subtitle2"
												sx={{
													color: 'rgb(0, 122, 255)',
													fontWeight: '600',
													'&:hover': {
														opacity: '1',
													},
												}}
											>
												List
											</Typography>
										)
									) : (
										<>
											{!isProfile && (
												<Typography
													onClick={(e) => {
														e.stopPropagation();
														handleOpenModalBuy();
													}}
													variant="subtitle2"
													sx={{
														color: 'rgb(0, 122, 255)',
														fontWeight: '600',
														'&:hover': {
															opacity: '1',
														},
														display:
															offer.status === 0 ? 'none' : 'block',
													}}
												>
													Buy Now
												</Typography>
											)}
										</>
									)}
								</Stack>
							</Box>
						</ItemContent>
					</Box>
				</ItemCardStyle>
			</Grid>

			{offer.status === 0 && isProfile ? (
				<ModelSell
					open={openModalBuy}
					handleClose={handleCloseModalBuy}
					handleListItem={sellItemAptos}
					setPrice={setPrice}
					price={price}
					supply={supply}
					statusList={statusList}
					userAmountOfItem={userAmountOfItem}
					handleValidateAmount={handleValidateAmount}
					royaltyFee={offer?.royalties.toString()!}
				/>
			) : (
				<>
					{/* <ModalBuy
						title="Buy Item"
						itemPrice={itemPrice}
						openState={openModalBuy}
						closeModal={() =>
							handleCloseModalBuy(handleNavigate(statusBuyNft.isSuccess))
						}
						funcBuyNft={claimOffer}
						activeStep={activeStep}
						statusBuyNft={statusBuyNft}
						steps={steps}
					/> */}
					{openModalBuy && (
						<ModalListOrder
							itemId={offer._id}
							isOpenModal={openModalBuy}
							setIsOpenModal={() => {
								handleCloseModalBuy();
							}}
						/>
					)}
				</>
			)}
		</>
	);
}
