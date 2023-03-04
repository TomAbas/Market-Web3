/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, CircularProgress, Link, Stack, Typography, useTheme } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { BiderBoxStack, CoverOfferTab, ItemOfferAuctionDetail } from './styled';
import { changePriceToToken, displayAddress, formatDate } from 'utils/function';
import { PriceStyle } from 'components/Marketplace/CardNFT/styled';
import { getUserInfo } from 'api/userApi';
import { tokenPaymentSymbol } from 'constants/sellItem';
import { useAppSelector } from 'redux/hooks';
import { selectTrigger } from 'redux/slices/nftFilter';
export interface IAppProps {
	bidderInfo: any;
	auctionDetail: any;
}

export default function OfferTab({ bidderInfo, auctionDetail }: IAppProps) {
	const [listBider, setListBider] = useState<any>();
	const trigger = useAppSelector(selectTrigger);
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
		} catch (error) {}
	}

	useEffect(() => {
		if (bidderInfo) {
			getInfoOfListBidder();
		}
	}, [bidderInfo, trigger]);
	return (
		<>
			{listBider ? (
				<Fragment>
					<CoverOfferTab>
						<Stack direction="column">
							{listBider?.map((bider: any, index: number) => (
								// <Link
								// 	key={index}
								// 	href={`/`}
								// 	target="_blank"
								// 	sx={{
								// 		textDecoration: 'none !important',
								// 		color: 'black',
								// 	}}
								// >
								<ItemOfferAuctionDetail mt={1} key={index}>
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
											<PriceStyle>
												{bider.userName === 'Anonymous'
													? displayAddress(bider.userAddress)
													: bider.userName}
											</PriceStyle>
											<Stack direction="row" columnGap={1}>
												<Typography noWrap>bid for</Typography>
												<PriceStyle noWrap>
													{changePriceToToken(
														bider.amount,
														auctionDetail.coinType
													)}
													{tokenPaymentSymbol[
														auctionDetail.coinType
															?.split('::')
															.slice(-1)[0]
													].toUpperCase()}{' '}
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
								// </Link>
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
