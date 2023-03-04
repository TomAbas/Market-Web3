/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { orderSell } from 'models/transaction';
import React, { Fragment, useEffect, useState } from 'react';
import { displayAddress } from 'utils/formatDisplay';
import { RELATED_URLS } from '../../../../../constants';
import NoMaxWidthTooltip from '../../../../../customComponents/LongToolTip/LongToolTip';
import { IconFavorite } from '../../../CardNFT/styled';
import { FeatureWrapper } from '../../../DetailCard/ItemInfo/styled';
import HeartFullRed from 'assets/icons/heart-full-red.svg';
import HeartFullBlack from 'assets/icons/heart-black.svg';
import Share from 'assets/icons/share-black.webp';
import useInteraction from 'hooks/useInteraction';
import { nftItem } from 'models/item';
import { TwitterShareButton } from 'react-share';
export interface IAppProps {
	auctionDetail: orderSell;
	item: nftItem;
}

export default function ItemNameAndOwner({ auctionDetail, item }: IAppProps) {
	const { likeItem, checkIsLike } = useInteraction();
	return (
		<Box position="relative">
			<Box>
				<Typography variant="h2" sx={{ fontWeight: '400', fontStyle: 'italic' }}>
					{auctionDetail.itemInfo.itemName}
				</Typography>
			</Box>
			<Stack gap={1} mt={2}>
				<Stack direction="row">
					<Typography variant="body1">Seller: &nbsp;</Typography>
					<Typography variant="body1" fontWeight={500}>
						{displayAddress(auctionDetail.maker)}
					</Typography>
				</Stack>
				<Stack direction="row">
					<Typography variant="body1">Collection: &nbsp;</Typography>
					<Typography variant="body1" fontWeight={500}>
						{auctionDetail.itemInfo.collectionInfo.collectionName}
					</Typography>
				</Stack>
			</Stack>
			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				sx={{ position: 'absolute', right: '0', top: '0' }}
			>
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
								{checkIsLike(item?._id) ? (
									<IconFavorite
										src={HeartFullRed}
										alt="icon favorite"
										onClick={() => {
											likeItem(item?._id, false);
										}}
									/>
								) : (
									<IconFavorite
										src={HeartFullBlack}
										alt="icon favorite"
										onClick={() => {
											likeItem(item?._id, true);
										}}
									/>
								)}
							</Box>

							<Typography variant="body1">{item?.countFav}</Typography>
						</Stack>
					</FeatureWrapper>

					<TwitterShareButton
						url={`${RELATED_URLS.MetaSpacecyHomePage}/#/item/${item?._id}`}
						title={`Look what I found! Item ${item?.itemName}`}
						hashtags={['Metaspacecy', 'AptosNFT', 'NFT', 'NFT_Marketplace']}
						via="metaspacecy"
						style={{ textAlign: 'left' }}
					>
						<FeatureWrapper sx={{ padding: '14px 15px', cursor: 'pointer' }}>
							<img src={Share} alt="icon share" style={{ height: '13px' }} />
						</FeatureWrapper>
					</TwitterShareButton>
				</Stack>
			</Stack>
		</Box>
	);
}
