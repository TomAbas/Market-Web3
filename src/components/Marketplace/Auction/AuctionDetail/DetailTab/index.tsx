// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Box, CircularProgress, Stack, Typography } from '@mui/material';
// import { PriceStyle } from 'components/CustomUI/Card/NFTItemCard/styled';
// import CopyToClipboardButton from 'components/CustomUI/CopyToClipboardButton';
// import React, { Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import { selectAuctionDetail } from 'redux/slices/auctionDetailByAuctionIdSlice';
// import { formatDate, formatTimestamp, sliceAddress } from 'utils';

export interface IAppProps {}

export default function DetailTab(props: IAppProps) {
	// const auctionDetail = useSelector(selectAuctionDetail);
	// console.log('auctionDetail', auctionDetail);

	return <></>;
	// auctionDetail ? (
	// 	<Fragment>
	// 		<Stack direction="row" justifyContent="space-between" mt={1}>
	// 			<Typography>Seller</Typography>
	// 			<Stack direction="row">
	// 				<Typography>{sliceAddress(auctionDetail?.seller, 8, 5)} </Typography>
	// 				<CopyToClipboardButton text={auctionDetail?.seller} placementTooltip="top" />
	// 			</Stack>
	// 		</Stack>
	// 		<Stack direction="row" justifyContent="space-between" mt={1}>
	// 			<Typography>Collection Address</Typography>
	// 			<Stack direction="row">
	// 				<Typography>
	// 					{sliceAddress(auctionDetail.collectionInfo.collectionAddress, 8, 5)}
	// 				</Typography>
	// 				<CopyToClipboardButton
	// 					text={auctionDetail.collectionInfo.collectionAddress}
	// 					placementTooltip="top"
	// 				/>
	// 			</Stack>
	// 		</Stack>
	// 		<Stack direction="row" justifyContent="space-between" mt={1}>
	// 			<Typography>TokenId</Typography>
	// 			<Typography>{auctionDetail.items[0].itemTokenId}</Typography>
	// 		</Stack>
	// 		<Stack direction="row" justifyContent="space-between" mt={1}>
	// 			<Typography>Highest Bid</Typography>
	// 			<Typography>
	// 				{auctionDetail?.highestBid} {auctionDetail?.priceType.toUpperCase()}
	// 			</Typography>
	// 		</Stack>
	// 		<Stack direction="row" justifyContent="space-between" mt={1}>
	// 			<Typography>Bid Increase Percent</Typography>
	// 			<Typography>{auctionDetail?.bidIncreasePercent}%</Typography>
	// 		</Stack>

	// 		<Stack direction="row" justifyContent="space-between" mt={1}>
	// 			<Typography>Start Time</Typography>
	// 			<Typography>
	// 				{formatTimestamp(auctionDetail.startTime, 'MMMM Do, YYYY, h:mm A')}
	// 			</Typography>
	// 		</Stack>
	// 		<Stack direction="row" justifyContent="space-between" mt={1}>
	// 			<Typography>End Time</Typography>
	// 			<Typography>
	// 				{formatTimestamp(auctionDetail.endTime, 'MMMM Do, YYYY, h:mm A')}
	// 			</Typography>
	// 		</Stack>
	// 	</Fragment>
	// ) : (
	// 	<Box width="100%" sx={{ textAlign: 'center' }}>
	// 		<CircularProgress sx={{ color: 'white' }} />
	// 	</Box>
	// );
}
