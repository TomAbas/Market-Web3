/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { Stack, Typography } from '@mui/material';
import CopyToClipboardButton from 'customComponents/CopyToClipboardButton';
import { orderSell } from 'models/transaction';
import React, { Fragment } from 'react';
import { formatTimeHistory, displayAddress } from 'utils/function';

export interface IAppProps {
	auctionDetail: orderSell;
}

export default function DetailTab({ auctionDetail }: IAppProps) {
	return (
		<Fragment>
			<Stack direction="row" justifyContent="space-between" mt={1}>
				<Typography>Seller</Typography>
				<Stack direction="row" spacing={1}>
					<Typography>{displayAddress(auctionDetail.maker)} </Typography>
					<CopyToClipboardButton text={auctionDetail.maker} placementTooltip="top" />
				</Stack>
			</Stack>
			<Stack direction="row" justifyContent="space-between" mt={1}>
				<Typography>Collection Name</Typography>
				<Stack direction="row" spacing={1}>
					<Typography>
						{displayAddress(auctionDetail.itemInfo.collectionInfo.collectionName)}
					</Typography>
					<CopyToClipboardButton
						text={auctionDetail.itemInfo.collectionInfo.collectionName}
						placementTooltip="top"
					/>
				</Stack>
			</Stack>
			<Stack direction="row" justifyContent="space-between" mt={1}>
				<Typography>auctionId</Typography>
				<Typography>{auctionDetail.auctionId}</Typography>
			</Stack>
			<Stack direction="row" justifyContent="space-between" mt={1}>
				<Typography>Highest Bid</Typography>
				<Typography>{'gia cao nhat'}</Typography>
			</Stack>

			<Stack direction="row" justifyContent="space-between" mt={1}>
				<Typography>Start Time</Typography>
				<Typography>{formatTimeHistory(auctionDetail.startTime)}</Typography>
			</Stack>
			<Stack direction="row" justifyContent="space-between" mt={1}>
				<Typography>End Time</Typography>
				<Typography>{formatTimeHistory(auctionDetail.expirationTime)}</Typography>
			</Stack>
		</Fragment>
	);
}
