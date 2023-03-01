/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, CircularProgress, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { BiderBoxStack, CoverOfferTab, ItemOfferAuctionDetail } from './styled';
import { displayAddress, formatDate } from 'utils/function';
import { PriceStyle } from 'components/Marketplace/CardNFT/styled';

export interface IAppProps {}

export default function OfferTab(props: IAppProps) {
	// const auctionDetail = useSelector(selectAuctionDetail);
	// const [listBider, setListBider] = useState<listBider[]>();
	// const theme = useTheme();
	// useEffect(() => {
	// 	if (auctionDetail) {
	// 		(async () => {
	// 			try {
	// 				const res: Response<any> = await auctionApi.getListBiderByInoId(
	// 					auctionDetail._id
	// 				);
	// 				setListBider(res.data);
	// 			} catch (error) {
	// 				console.log('some error when get list bider', error);
	// 			}
	// 		})();
	// 	}
	// }, [auctionDetail]);

	return (
		<>
			{/* {auctionDetail && listBider ? (
				<Fragment>
					<CoverOfferTab>
						<Stack direction="column">
							{listBider?.map((bider: listBider, index: number) => (
								<Link
									key={index}
									href={`/`}
									target="_blank"
									sx={{
										...(theme.palette.mode === 'light'
											? { color: 'black' }
											: { color: 'white' }),

										'&:hover': {
											textDecoration: 'none !important',
										},
									}}
								>
									<ItemOfferAuctionDetail mt={1}>
										<Box marginRight="24px">
											<img
												style={{
													width: '56px',
													height: '56px',
													borderRadius: '50%',
													border: '1px solid #fff',
												}}
												src={bider.userInfo.avatar}
												alt=""
											/>
										</Box>

										<Stack direction="column">
											<BiderBoxStack>
												{sliceAddress(bider.userAddress, 8, 5)} by{' '}
												<PriceStyle>
													{bider.userInfo.username === 'Anonymous'
														? displayAddress(bider.userAddress, 8, 5)
														: bider.userInfo.username}
												</PriceStyle>
												<Stack direction="row" columnGap={1}>
													<Typography noWrap>bid for</Typography>
													<PriceStyle noWrap>
														{bider.tokenAmount} {''}
														{bider.priceType.toUpperCase()}
													</PriceStyle>
												</Stack>
											</BiderBoxStack>
											<Typography sx={{ opacity: '0.6' }}>
												{formatDate(
													bider.updatedAt,
													'MMMM Do, YYYY, h:mm A'
												)}
											</Typography>
										</Stack>
									</ItemOfferAuctionDetail>
								</Link>
							))}
						</Stack>
					</CoverOfferTab>
				</Fragment>
			) : (
				<Box textAlign="center" mt={3}>
					<CircularProgress sx={{ color: 'white' }} />
				</Box>
			)} */}
		</>
	);
}
