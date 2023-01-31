/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useNavigate } from 'react-router-dom';
import { openFirstModal } from '../../../redux/slices/modalWallet';
import { useAppDispatch } from '../../../redux/hooks';
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
import { buyItem } from '../../../api/collectionApi';
import { changePriceToToken } from 'utils/function';
import { useEffect, useState } from 'react';
import useBuyItemAptos from '../../../utils/putAptos';

const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
// const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
const DECIMAL = 100000000;

export default function CardNFT({
	itemLiked,
	likeItem,
	offer,
	setOffers,
	offers,
	index,
	loadingOffers,
}: {
	itemLiked: (itemId: string) => boolean;
	likeItem: any;
	offer: any;
	setOffers: any;
	offers: any;
	index: any;
	loadingOffers: any;
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
	const { buyItemAptos } = useBuyItemAptos(offer);
	const [itemPrice, setItemPrice] = useState<number>();
	function changePrice() {
		setItemPrice(changePriceToToken(offer.price));
	}
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
	let navigate = useNavigate();
	const encodeURI = (uri: string) => {
		return encodeURIComponent(uri);
	};
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
	useEffect(() => {
		changePrice();
	}, []);
	return (
		<>
			<Grid xs={6} sm={4} md={3} p={1} sx={{ transition: 'all 0.5s ease', animation: '' }}>
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
									<img src={TwitterIcon} alt="icon twitter" />
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
										width: '70%',
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
										sx={{ cursor: 'pointer' }}
									>
										{offer.itemName}
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
										<Box sx={{ display: 'flex', gap: '5px' }}>
											{itemPrice} APT
										</Box>
									)}

									<Typography
										onClick={(e) => {
											e.stopPropagation();
											handleOpenModalBuy();
										}}
										variant="subtitle2"
										sx={{
											color:
												offer.status === 0
													? 'rgba(0, 0, 0, 0.3)'
													: 'rgb(0, 122, 255)',
											fontWeight: '600',
											'&:hover': {
												opacity: '1',
											},
											pointerEvents: offer.status === 0 ? 'none' : 'all',
										}}
									>
										Buy Now
									</Typography>
								</Stack>
							</Box>
						</ItemContent>
					</Box>
				</ItemCardStyle>
			</Grid>

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
