/* eslint-disable @typescript-eslint/no-unused-vars */
import { nftItem } from 'models/item';
import SendIcon from '@mui/icons-material/Send';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	Box,
	Stack,
	Typography,
	Skeleton,
	List,
	ListItem,
	Avatar,
	Tooltip,
	Link,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { ItemImage, FeatureWrapper } from 'components/Marketplace/styled';
import MediaDisplayCard from 'components/Marketplace/MediaDisplayCard/MediaDisplayCard';
import { TwitterShareButton } from 'react-share';
import Share from 'assets/icons/share-black.webp';

//img
import HeartFullRed from '../../../../assets/icons/heart-full-red.svg';
import HeartFullBlack from '../../../../assets/icons/heart-black.svg';

import defaultImg from '../../../../assets/icons/default-img-input2.png';
import { User } from 'models/user';
import { useNavigate } from 'react-router-dom';
import DropDown from 'components/CustomUI/DropDown';
import { IconFavorite } from 'components/Marketplace/CardNFT/styled';
import useInteraction from 'hooks/useInteraction';
import { OptionSelectCustom, RELATED_URLS } from 'constants/index';
import { displayAddress } from 'utils/function';
import ModalTransferNFT from './ModalTransfer';
import AutoCompleteCustom from 'components/CustomField/DropdownOwner';
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
				<>
					<ItemImage sx={{ width: '50%', paddingTop: '50%', maxWidth: '672px' }}>
						<Box className="main-img">
							<MediaDisplayCard
								media={item!.itemMedia}
								preview={defaultImg}
								name={item!.itemName}
							/>
						</Box>
					</ItemImage>
					<Stack
						gap="16px"
						sx={{ width: '50%', height: '750px' }}
						direction="row"
						spacing={{ xs: 1, sm: 2, md: 4 }}
					>
						<Stack gap="16px" sx={{ flex: '1', overflow: 'hidden' }}>
							{' '}
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
									console.log(desRef.current?.offsetHeight);
									setShow(!show);
								}}
							>
								{item?.description}
							</Typography>
							{item?.status === 1 && (
								<Typography variant="body1">
									Sell Quantity : {itemResource?.amount}
								</Typography>
							)}
							<Stack
								direction={'row'}
								alignItems={'center'}
								spacing={2}
								sx={{ maxWidth: '300px' }}
							>
								<Avatar src={item?.creatorInfo.avatar} variant="square" />
								<Stack
									direction={'column'}
									sx={{ maxWidth: '100%', overflow: 'hidden' }}
								>
									<Typography variant="body1" fontWeight={500}>
										Creator
									</Typography>
									<Tooltip title={item?.creator}>
										<Link
											href={`/#/profile?address=${item?.creator}`}
											underline="none"
										>
											<Typography fontWeight="400" variant="subtitle1" noWrap>
												{item?.creatorInfo.username}
											</Typography>
										</Link>
									</Tooltip>
								</Stack>
							</Stack>
							<Stack alignItems="flex-start" spacing={2} sx={{ maxWidth: '300px' }}>
								<AutoCompleteCustom
									onChange={handleChangeCategory}
									currentItem={currentCategoryTransformed}
									listItem={listOwner}
									sx={{ width: '100%' }}
								/>
							</Stack>
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
								{itemResource !== undefined && (
									<>
										{item?.status === 1 ? (
											<>
												{itemResource?.owner != userInfo?.userAddress ? (
													<button onClick={handleOpenModalBuy}>
														Buy Now
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
														Sell Item
													</button>
												)}
											</>
										)}
									</>
								)}
							</Box>
						</Stack>
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

									<Typography variant="body1">{item?.countFav}</Typography>
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
								// hashtags={['Music', 'Game']}
								via="Metaspacecy"
								style={{ textAlign: 'left' }}
							>
								<FeatureWrapper sx={{ padding: '14px 15px', cursor: 'pointer' }}>
									<img src={Share} alt="icon share" style={{ height: '13px' }} />
								</FeatureWrapper>
							</TwitterShareButton>
							{/* <FeatureWrapper>
								<DropDown
									activeDropDown={activeDropDown}
									setActiveDropDown={setActiveDropDown}
									buttonContent={<ButtonContent />}
									dropdownContent={<DropdownContent item={item} />}
									sx={{ right: 0, left: 'unset' }}
								/>
							</FeatureWrapper> */}
						</Stack>
					</Stack>
				</>
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
