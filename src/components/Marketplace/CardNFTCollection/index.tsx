/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet, Wallet } from '@manahippo/aptos-wallet-adapter';
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

const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
const DECIMAL = 100000000;

export default function CardNFTCollection({
	offer,
	setOffers,
	offers,
	index,
}: {
	offer: any;
	setOffers: any;
	offers: any;
	index: any;
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
				statusBuyNft.isSuccess ? 'Congrat' : statusBuyNft.isError && 'Something went wrong'
			}`,
			description: `${
				statusBuyNft.isSuccess ? 'You bought your NFT' : statusBuyNft.isError && 'Try again'
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

			await signAndSubmitTransaction(payload, { gas_unit_price: 100 });

			const fetchOffers = async () => {
				let newList = offers.filter((_item: any, i: any) => i !== index);
				setOffers(newList);
			};
			fetchOffers();
			completeTaskSuccess();
			handleNext();
		} catch {
			failToComplete();
			handleNext();
		}
	};

	const handleItem = () => {
		navigate(
			`/item?creator=${encodeURI(
				offer.token_id.token_data_id.creator
			)}&collection=${encodeURI(offer.token_id.token_data_id.collection)}&name=${encodeURI(
				offer.token_id.token_data_id.name
			)}`
		);
		console.log('1');
	};

	return (
		<>
			<Grid xs={6} sm={4} md={3} p={1}>
				<ItemCardStyle sx={{ boxShadow: 0 }} onClick={handleItem}>
					<Box sx={{ p: 1.5, fontStyle: 'italic' }}>
						{/* Item image */}
						<ItemImage>
							<Box className="main-img">
								<img src={offer.uri} alt="item" />
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

							{/* Item creator / owner */}
							{/* <Stack
							direction="row"
							sx={{
								position: 'absolute',
								bottom: '-10px',
								left: '10px',
							}}
						>
							<Tooltip
								title={`Creator: ${item.creator?.substring(
									0,
									10
								)}...${item.creator?.substring(37)}`}
								arrow
								placement="top"
								aria-describedby="tip1"
							>
								<AvatarIcon>
									{item.creatorInfo?.avatar ===
									'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
										<GradIcon
											sx={{
												background: creatorAvatar,
												color: '#000',
											}}
										/>
									) : (
										<Avatar
											sx={{ width: 25, height: 25 }}
											src={item.creatorInfo?.avatar}
											alt="creator"
										/>
									)}
								</AvatarIcon>
							</Tooltip>
							{item.owner[0] && item.ownerInfo && item.ownerInfo[0] && (
								<Tooltip
									title={`Owner: ${
										item.owner[0]
											? sliceAddress(item.owner[0], 6, 6)
											: sliceAddress(NULL_ADDRESS, 6, 6)
									}`}
									arrow
									placement="top"
									aria-describedby="tip1"
								>
									<AvatarIcon sx={{ marginLeft: '-10px', zIndex: 1 }}>
										{item.ownerInfo[0].avatar ===
										'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
											<GradIcon
												sx={{
													background: ownerAvatar,
												}}
											/>
										) : (
											<Avatar
												sx={{ width: 25, height: 25 }}
												src={item.ownerInfo[0].avatar}
												alt="creator"
											/>
										)}
									</AvatarIcon>
								</Tooltip>
							)}
						</Stack> */}
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
									{/* <Box>
									<Tooltip
										title={NETWORKINFO[item.chainId].name}
										placement="top"
										aria-describedby="tip1"
										arrow
										// componentsProps={{
										// 	tooltip: {
										// 		sx: {
										// 			bgcolor: 'common.black',
										// 			'& .MuiTooltip-arrow': {
										// 				color: 'common.black',
										// 			},
										// 		},
										// 	},
										// }}
									>
										<ImageBlockchain>
											<img
												src={NETWORKINFO[item.chainId].image}
												alt="icon blockchain"
											/>
										</ImageBlockchain>
									</Tooltip>
								</Box> */}
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
										{/* <img src={HistoryIcon} alt="history" />
													<span
														style={{
															fontWeight: 500,
															fontSize: '14px',
															color: '#5A5D79',
														}}
													>
														View History
													</span> */}
										{offer.price / DECIMAL} APT
									</Box>

									<Typography
										onClick={handleOpenModalBuy}
										variant="body2"
										sx={{
											fontWeight: offer.is_cancle ? '300' : '600',
											// cursor:
											// 	item.status === ITEM_STATUS.BUY_NOW
											// 		? 'pointer'
											// 		: 'no-drop',
											// opacity: '0.85',
											// color:
											// 	item.status === ITEM_STATUS.BUY_NOW
											// 		? theme.palette.text.special
											// 		: 'rgba(0,0,0,0.3)',

											// ...(theme.palette.mode === 'light'
											// 	? {
											// 		color:
											// 			item.status ===
											// 				ITEM_STATUS.BUY_NOW
											// 				? theme.palette.text
											// 					.special
											// 				: 'rgba(0,0,0,0.3)',
											// 	}
											// 	: {
											// 		color:
											// 			item.status ===
											// 				ITEM_STATUS.BUY_NOW
											// 				? theme.palette.text
											// 					.special
											// 				: 'rgba(255,255,255,0.5)',
											// 	}),
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
