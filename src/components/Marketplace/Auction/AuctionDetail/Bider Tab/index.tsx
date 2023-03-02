/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, CircularProgress, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { BiderBoxStack, CoverOfferTab, ItemOfferAuctionDetail } from './styled';
import { displayAddress, formatDate } from 'utils/function';
import { PriceStyle } from 'components/Marketplace/CardNFT/styled';
import { getUserInfo } from 'api/userApi';
export interface IAppProps {
	bidderInfo: any;
}

export default function OfferTab({ bidderInfo }: IAppProps) {
	const [listBider, setListBider] = useState<any>();
	// const theme = useTheme();
	async function getInfoOfListBidder() {
		const { bids } = bidderInfo;
		const { data } = bids;
		try {
			let result = await Promise.all(
				data.reverse().map(async (item: any) => {
					let a = await getUserInfo(item.value.bidder).then((res) => res.data.data);
					return {
						userName: a.username,
						avatar: a.avatar,
						userAddress: item.value.bidder,
						amount: item.key,
					};
				})
			);
			setListBider(result);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (bidderInfo) {
			getInfoOfListBidder();
		}
	}, [bidderInfo]);
	return (
		<>
			{listBider ? (
				<Fragment>
					<CoverOfferTab>
						<Stack direction="column">
							{listBider?.map((bider: any, index: number) => (
								<Link
									key={index}
									href={`/`}
									target="_blank"
									sx={{
										textDecoration: 'none !important',
										color: 'black',
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
												src={bider.avatar}
												alt=""
											/>
										</Box>

										<Stack direction="column">
											<BiderBoxStack>
												{displayAddress(bider.userAddress)} by{' '}
												<PriceStyle>
													{bider.userName === 'Anonymous'
														? displayAddress(bider.userAddress)
														: bider.userName}
												</PriceStyle>
												<Stack direction="row" columnGap={1}>
													<Typography noWrap>bid for</Typography>
													<PriceStyle noWrap>
														{bider.amount} {''}
														{/* {bider.priceType.toUpperCase()} */}
													</PriceStyle>
												</Stack>
											</BiderBoxStack>
											{/* <Typography sx={{ opacity: '0.6' }}>
												{formatDate(
													bider.updatedAt,
													'MMMM Do, YYYY, h:mm A'
												)}
											</Typography> */}
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
			)}
		</>
	);
}
