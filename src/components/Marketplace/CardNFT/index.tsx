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
import aptos from '../../../assets/images/card/aptos.jpg';
import ModalBuy from 'components/ModalBuy/ModalBuy';
import useControlModal from 'hooks/useControlModal';
import { toast } from 'react-toastify';
import MediaDisplayCard from '../MediaDisplayCard/MediaDisplayCard';
import { buyItem } from '../../../api/collectionApi';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
// const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
const DECIMAL = 100000000;

export default function CardNFT({
	offer,
	setOffers,
	offers,
	index,
	loadingOffers,
}: {
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
	const { account, signAndSubmitTransaction } = useWallet();
	const dispatch = useAppDispatch();

	const encodeURI = (uri: string) => {
		return encodeURIComponent(uri);
	};
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
					offer.token_id.token_data_id.creator,
					offer.token_id.token_data_id.collection,
					offer.token_id.token_data_id.name,
					offer.token_id.property_version,
				],
			};

			let hash = await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(
				(res) => res.hash
			);
			console.log(offer);
			let listItem: any = {
				maker: account?.address?.toString(),
				chainId: '2',
				price: offer.price,
				quantity: offer.amount,
				to: MARKET_ADDRESS,
				txHash: hash,
				itemName: offer.token_id.token_data_id.name,
				collectionName: offer.token_id.token_data_id.collection,
				creator: offer.token_id.token_data_id.creator,
				owner: offer.owner,
			};
			buyItem(listItem);
			toast.success('Successfully purchased an item');
			const fetchOffers = async () => {
				let newList = offers.filter((_item: any, i: any) => i !== index);
				setOffers(newList);
			};
			fetchOffers();
			completeTaskSuccess();

			handleNext();
		} catch {
			toast.error('Something went wrong. Try again!');
			failToComplete();
			handleNext();
		}
	};

	const handleNavigate = (status: boolean) => {
		if (status) {
			navigate('/profile');
		}
	};

	const handleClickItem = () => {
		navigate(
			`/item?creator=${encodeURI(
				offer.token_id.token_data_id.creator
			)}&collection=${encodeURI(offer.token_id.token_data_id.collection)}&name=${encodeURI(
				offer.token_id.token_data_id.name
			)}`
		);
	};

	return (
		<>
			<Grid xs={6} sm={4} md={3} p={1} onClick={handleClickItem}>
				<ItemCardStyle sx={{ boxShadow: 0 }}>
					<Box sx={{ p: 1.5, fontStyle: 'italic' }}>
						{/* Item image */}

						<ItemImage>
							<Box className="main-img">
								<MediaDisplayCard
									media={offer?.uri}
									preview={TwitterIcon}
									name={offer?.token_id.token_data_id.name}
								/>
								{/* <img src={offer.uri} alt="item" /> */}
							</Box>
							{/* Item favorite */}
							<ItemFavorite>
								<Box mr={1.5}>
									{/* <TwitterShareButton
									url={`${RELATED_URLS.MetaSpacecyHomePage}/#${PATH_ITEM.detail}/${item?._id}`}
									title={`Look what I found! ${item?.itemName} collectible`}
									hashtags={['Music', 'Game']}
									via="Metaspacecy"
									style={{ width: '100%' }}
								>
									<img src={TwitterIcon} alt="icon twitter" />
								</TwitterShareButton> */}
									<img src={TwitterIcon} alt="icon twitter" />
								</Box>
								<Box>
									<Stack direction="row" alignItems="center" spacing={0.5}>
										<Box
											sx={{
												cursor: 'pointer',
											}}
										>
											{/* {likeState ? (
											<IconFavorite src={HeartFullRed} alt="icon favorite" />
										) : (
											<IconFavorite src={HeartWhite} alt="icon favorite" />
										)} */}
											<IconFavorite src={HeartFullRed} alt="icon favorite" />
										</Box>
										<Typography variant="body1">1</Typography>
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
								>
									<Typography
										variant="subtitle1"
										fontWeight="500"
										noWrap
										sx={{ cursor: 'default' }}
									>
										{offer.token_id.token_data_id.name}
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
									<Box sx={{ display: 'flex', gap: '5px' }}>
										{offer.price / DECIMAL} APT
									</Box>
									<Typography
										onClick={(e) => {
											e.stopPropagation();
											handleOpenModalBuy();
										}}
										variant="body2"
										sx={{
											fontWeight: offer.is_cancle ? '300' : '600',
											'&:hover': {
												opacity: '1',
											},
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
