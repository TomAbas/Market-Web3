import { nftItem } from 'models/item';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useRef, useState } from 'react';
import {
	Box,
	Stack,
	Typography,
	Skeleton,
	Avatar,
	Tooltip,
	Link,
	Container,
	Grid,
} from '@mui/material';
import { ItemImage, FeatureWrapper } from './styled';
import MediaDisplayCard from 'components/Marketplace/MediaDisplayCard/MediaDisplayCard';
import { TwitterShareButton } from 'react-share';
import Share from 'assets/icons/share-black.webp';

//img
import HeartFullRed from '../../../../assets/icons/heart-full-red.svg';
import HeartFullBlack from '../../../../assets/icons/heart-black.svg';

import defaultImg from '../../../../assets/icons/default-img-input2.png';
import { User } from 'models/user';
import { useNavigate } from 'react-router-dom';
import { IconFavorite } from 'components/Marketplace/CardNFT/styled';
import useInteraction from 'hooks/useInteraction';
import { OptionSelectCustom, RELATED_URLS } from 'constants/index';
import ModalTransferNFT from './ModalTransfer';
import AutoCompleteCustom from 'components/CustomField/DropdownOwner';
import NoMaxWidthTooltip from 'customComponents/LongToolTip/LongToolTip';
import { displayUserFullName } from 'utils/formatDisplay';
import OfferingsAndLisings from '../OfferingsAndListings';
interface Props {
	loadingItem: boolean;
	itemResource: any;
	item: nftItem | undefined;
	handleOpenModalBuy: any;
	handleWithdrawItem: any;
	statusWithdraw: any;
	userInfo: User | null;
	itemPrice: number;
	userAmountOfItem: number;
}

const ItemInfo: React.FC<Props> = ({
	loadingItem,
	item,
	itemResource,
	handleOpenModalBuy,
	handleWithdrawItem,
	userInfo,
	statusWithdraw,
	itemPrice,
	userAmountOfItem,
}) => {
	const listOwner: any = item?.ownerInfo?.map((item: User) => ({
		name: item.username,
		value: item.userAddress,
		image: item.avatar,
	})) || [{ name: '', value: '', image: '' }];

	const [currentCategoryTransformed, setCurrentCategoryTransformed] = useState<
		OptionSelectCustom<string> | null | undefined
	>();
	const [show, setShow] = useState(false);
	const desRef: any = useRef();
	const { likeItem, checkIsLike } = useInteraction();
	const [openModalTransfer, setOpenModalTransfer] = useState(false);
	const navigate = useNavigate();
	const navigateCollection = () => {
		navigate(`/collection-detail/${item?.collectionId}`);
	};
	const handleChangeCategory = (item: any) => {
		setCurrentCategoryTransformed(item);
	};
	useEffect(() => {
		setCurrentCategoryTransformed(listOwner[0]);
	}, [item]);
	return (
		<>
			{' '}
			{loadingItem ? (
				<>
					<Box>
						<Skeleton sx={{ width: '100%', transform: 'translateY(0px)' }}>
							<ItemImage sx={{ width: '50%', paddingTop: '0' }}>
								<Box className="main-img" sx={{ width: '600px', height: '600px' }}>
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
				<Container maxWidth="xl" sx={{ mt: 2, fontStyle: 'italic' }}>
					{/* Item image / Item info */}
					<Grid container spacing={10}>
						<Grid item xs={12} lg={5} md={6}>
							<ItemImage sx={{ width: '100%' }}>
								<Box className="main-img">
									<MediaDisplayCard
										media={item!.itemMedia}
										preview={defaultImg}
										name={item!.itemName}
									/>
								</Box>
							</ItemImage>
						</Grid>
						<Grid item xs={12} lg={7} md={6}>
							<Stack direction={'row'} justifyContent={'space-between'}>
								<NoMaxWidthTooltip
									title={displayUserFullName(item!.collectionInfo.collectionName)}
								>
									<Typography
										variant="h6"
										fontWeight={500}
										sx={{ color: '#007aff', cursor: 'pointer' }}
										onClick={navigateCollection}
										noWrap
									>
										{item?.collectionInfo.collectionName}
									</Typography>
								</NoMaxWidthTooltip>
								<Stack direction="row" alignItems="flex-start">
									<FeatureWrapper>
										<Stack
											direction="row"
											alignItems="center"
											spacing={1}
											sx={{ padding: '8px', cursor: 'pointer' }}
											onClick={(e) => e.stopPropagation()}
										>
											<Box>
												{checkIsLike(item!._id) ? (
													<IconFavorite
														src={HeartFullRed}
														alt="icon favorite"
														onClick={() => {
															likeItem(item!._id, false);
														}}
													/>
												) : (
													<IconFavorite
														src={HeartFullBlack}
														alt="icon favorite"
														onClick={() => {
															likeItem(item!._id, true);
														}}
													/>
												)}
											</Box>

											<Typography variant="body1">
												{item?.countFav}
											</Typography>
										</Stack>
									</FeatureWrapper>
									{userAmountOfItem > 0 && (
										<FeatureWrapper
											sx={{ cursor: 'pointer' }}
											onClick={() => setOpenModalTransfer(true)}
										>
											<SendIcon sx={{ m: 1 }}></SendIcon>
										</FeatureWrapper>
									)}

									<TwitterShareButton
										url={`${RELATED_URLS.MetaSpacecyHomePage}/#/item/${item?._id}`}
										title={`Look what I found! Item ${item?.itemName}`}
										hashtags={[
											'Metaspacecy',
											'AptosNFT',
											'NFT',
											'NFT_Marketplace',
										]}
										via="metaspacecy"
										style={{ textAlign: 'left' }}
									>
										<FeatureWrapper
											sx={{ padding: '14px 15px', cursor: 'pointer' }}
										>
											<img
												src={Share}
												alt="icon share"
												style={{ height: '13px' }}
											/>
										</FeatureWrapper>
									</TwitterShareButton>
								</Stack>
							</Stack>
							<Box sx={{ width: '100%', minHeight: '350px', position: 'relative' }}>
								<Stack gap="16px" sx={{ flex: '1', overflow: 'hidden' }}>
									{' '}
									<NoMaxWidthTooltip title={displayUserFullName(item!.itemName)}>
										<Typography variant="h4" fontWeight={500} noWrap>
											{item?.itemName}
										</Typography>
									</NoMaxWidthTooltip>
									<Typography
										variant="body1"
										ref={desRef}
										sx={{
											transition: 'max-height ease 0.5s',
											whiteSpace: `${show ? 'unset' : 'nowrap'}`,
											textAlign: ` ${show ? 'justify' : 'unset'}`,
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											maxHeight: `${show ? '500px' : '49px'}`,
											height: `${show ? 'auto' : '49px'}`,
										}}
										onClick={() => {
											if (desRef.current?.offsetHeight < 48) {
												return;
											}
											setShow(!show);
										}}
									>
										{item?.description}
									</Typography>
									<Box>
										<Stack direction="row" gap="20px">
											<Stack spacing={2} sx={{ width: '50%' }}>
												<Stack>
													<Typography variant="body1" fontWeight={500}>
														Creator
													</Typography>
												</Stack>
												<Stack
													direction="row"
													alignItems={'center'}
													spacing={2}
												>
													<Avatar
														src={item?.creatorInfo.avatar}
														variant="square"
													/>
													<Box sx={{ overflow: 'hidden' }}>
														<Tooltip title={item?.creator}>
															<Link
																href={`/#/profile?address=${item?.creator}`}
																underline="none"
															>
																<Typography
																	fontWeight="400"
																	variant="subtitle1"
																	noWrap
																>
																	{item?.creatorInfo.username}
																</Typography>
															</Link>
														</Tooltip>
													</Box>
												</Stack>
											</Stack>
											<Stack
												alignItems="flex-start"
												spacing={2}
												sx={{ width: '50%' }}
											>
												<AutoCompleteCustom
													onChange={handleChangeCategory}
													currentItem={currentCategoryTransformed}
													listItem={listOwner}
													sx={{ width: '100%' }}
												/>
											</Stack>
										</Stack>
									</Box>
									<Box
										sx={{
											button: {
												padding: '10px 20px',
												border: '1.5px solid #e7e8ec',
												transition: 'all 0.4s',
												borderRadius: '12px',
												fontWeight: 500,
												background: '#fff',
												fontSize: '15px',
												cursor: 'pointer',
												fontFamily: 'Montserrat, sans-serif !important',
												fontStyle: 'italic !important',
												width: '150px',
												'&:hover': {
													background: '#007aff',
													borderColor: 'transparent',
													color: '#fff',
												},
											},
										}}
									>
										{item?.owner.includes(userInfo?.userAddress!) && (
											<button
												onClick={() => {
													navigate(`/item/sell-item/${item!._id}`);
												}}
											>
												List
											</button>
										)}
									</Box>
									<OfferingsAndLisings item={item!} userInfo={userInfo!} />
								</Stack>
							</Box>
						</Grid>
					</Grid>
				</Container>
			)}
			<ModalTransferNFT
				quantity={userAmountOfItem}
				itemInfo={item!}
				setOpen={setOpenModalTransfer}
				open={openModalTransfer}
			/>
		</>
	);
};

export default ItemInfo;
