/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { orderSell } from 'models/transaction';
import React, { Fragment, useEffect, useState } from 'react';
import { displayAddress } from 'utils/formatDisplay';

export interface IAppProps {
	auctionDetail: orderSell;
}

export default function ItemNameAndOwner({ auctionDetail }: IAppProps) {
	return (
		<Fragment>
			<Box>
				<Typography variant="h2" sx={{ fontWeight: '400', fontStyle: 'italic' }}>
					{auctionDetail.itemInfo.itemName}
				</Typography>
				{/* <Stack direction="row" sx={{ margin: '16px 0', fontWeight: '500' }}>
					<span>Owner: {sliceAddress(auctionDetail?.seller, 8, 5)} </span>
					<CopyToClipboardButton text={auctionDetail?.seller} placementTooltip="top" />
				</Stack> */}
			</Box>
			<Stack gap={1} mt={2}>
				{/* <Grid container spacing={1}>
					<Grid item xs>
						<ContainerOwnerAndCollectionAuctionDetail>
							<Box sx={{ width: '60px', height: '60px' }}>
								<img
									style={{
										// width: '100%',
										height: '100%',
										borderRadius: '8px',
										marginRight: '20px',
									}}
									src={resUser?.avatar}
									alt=""
								/>
							</Box>

							<Stack marginLeft={2} direction="column">
								<Typography>Seller :</Typography>
								<Typography>{resUser?.username}</Typography>
							</Stack>
						</ContainerOwnerAndCollectionAuctionDetail>
					</Grid>
					<Grid
						item
						sx={{
							[theme.breakpoints.down(1000)]: {
								display: 'none',
							},
						}}
					>
						<DeviderGradientNext></DeviderGradientNext>
					</Grid>
					<Grid item xs>
						<ContainerOwnerAndCollectionAuctionDetail>
							<Box sx={{ width: '60px', height: '60px' }}>
								<img
									style={{
										// width: '100%',
										height: '100%',
										borderRadius: '8px',
										marginRight: '20px',
									}}
									src={resCollection?.logo}
									alt=""
								/>
							</Box>

							<Stack marginLeft={2} direction="column">
								<Typography>Colection:</Typography>
								<Typography>
									{sliceString(String(resCollection?.collectionName), 20)}
								</Typography>
							</Stack>
						</ContainerOwnerAndCollectionAuctionDetail>
					</Grid>
				</Grid> */}
				<Stack direction="row">
					<Typography variant="body1">Seller: &nbsp;</Typography>
					<Typography variant="body1" fontWeight={500}>
						{displayAddress(auctionDetail.maker)}
					</Typography>
				</Stack>
				<Stack direction="row">
					<Typography variant="body1">Colection: &nbsp;</Typography>
					<Typography variant="body1" fontWeight={500}>
						{auctionDetail.itemInfo.collectionInfo.collectionName}
					</Typography>
				</Stack>
			</Stack>
		</Fragment>
	);
}
