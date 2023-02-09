/* eslint-disable @typescript-eslint/no-unused-vars */
import { nftItem } from 'models/item';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Stack, Typography, Skeleton, CircularProgress } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { ItemImage, FeatureWrapper } from 'components/Marketplace/styled';
import MediaDisplayCard from 'components/Marketplace/MediaDisplayCard/MediaDisplayCard';
import { TwitterShareButton } from 'react-share';
//img
import HeartFullRed from '../../../../assets/icons/heart-full-red.svg';
import HeartFullBlack from '../../../../assets/icons/heart-black.svg';

import defaultImg from '../../../../assets/icons/default-img-input2.png';
import { User } from 'models/user';
import { useNavigate } from 'react-router-dom';
import DropDown from 'components/CustomUI/DropDown';
import {
	DropDownOption,
	DropDownWrapper,
	IconFavorite,
} from 'components/Marketplace/CardNFT/styled';
import useInteraction from 'hooks/useInteraction';
import { RELATED_URLS } from 'constants/index';
interface Props {
	loadingItem: boolean;
	itemResource: any;
	item: nftItem | undefined;
	handleOpenModalBuy: any;
	handleWithdrawItem: any;
	statusWithdraw: any;
	userInfo: User | null;
	itemPrice: number;
}
interface Props1 {
	item: nftItem | undefined;
}

const DropdownContent: React.FC<Props1> = ({ item }) => {
	return (
		<DropDownWrapper sx={{ padding: '10px' }}>
			<DropDownOption variant="subtitle2" onClick={() => window.location.reload()}>
				Refresh metadata
			</DropDownOption>

			<TwitterShareButton
				url={`${RELATED_URLS.MetaSpacecyHomePage}/#/item/${item?._id}`}
				title={`Look what I found! ${item?.itemName} collectible`}
				hashtags={['Music', 'Game']}
				via="Metaspacecy"
				style={{ width: '100%', textAlign: 'left' }}
			>
				<DropDownOption variant="subtitle2">Share</DropDownOption>
			</TwitterShareButton>
			{/* Enable/Disable Report */}
			{/* <DropDownOption variant="subtitle2">Report</DropDownOption> */}
		</DropDownWrapper>
	);
};
const ButtonContent = () => {
	return (
		<Stack direction="row" alignItems="center" sx={{ padding: '8px', cursor: 'pointer' }}>
			<MoreHorizOutlinedIcon sx={{ width: '32px' }} />
		</Stack>
	);
};
const ItemInfo: React.FC<Props> = ({
	loadingItem,
	item,
	itemResource,
	handleOpenModalBuy,
	handleWithdrawItem,
	userInfo,
	statusWithdraw,
	itemPrice,
}) => {
	const [show, setShow] = useState(false);
	const desRef: any = useRef();
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const { likeItem, checkIsLike } = useInteraction();
	const navigate = useNavigate();
	const navigateCollection = () => {
		// console.log(name, creater);
		navigate(`/collection-detail/${item?.collectionId}`);
	};

	useEffect(() => {
		console.log(desRef.current?.offsetHeight);
	}, [show]);
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
									textAlign: ` ${
										desRef.current?.offsetHeight > 150 ? 'justify' : 'center'
									}`,
									padding: '0px 24px',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									maxHeight: `${show ? '500px' : '149px'}`,
									height: `${show ? 'auto' : '149px'}`,
								}}
								onClick={() => {
									if (desRef.current?.offsetHeight < 148) {
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
								{itemResource !== undefined && (
									<>
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

							<FeatureWrapper>
								<DropDown
									activeDropDown={activeDropDown}
									setActiveDropDown={setActiveDropDown}
									buttonContent={<ButtonContent />}
									dropdownContent={<DropdownContent item={item} />}
									sx={{ right: 0, left: 'unset' }}
								/>
							</FeatureWrapper>
						</Stack>
					</Stack>
				</>
			)}
		</>
	);
};

export default ItemInfo;
