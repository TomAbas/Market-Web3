/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
	AvatarIcon,
	BoxCountDown,
	ErrorContent,
	GradIcon,
	ImageBlockchain,
	ItemCardStyle,
	ItemContent,
	ContentFooter,
	ItemImage,
	PriceChangeStyle,
	PriceStyle,
	StackCard,
	ItemFavorite,
	IconFavorite,
	DropDownWrapper,
	DropDownOption,
	LinkWrapper,
} from './styled';

import TwitterIcon from '../../../assets/icons/twitter-white.svg';
import HeartFullRed from '../../../assets/icons/heart-full-red.svg';
import HeartFullWhite from '../../../assets/icons/heart-white.svg';
import item from '../../../assets/images/card/box.webp';
import aptos from '../../../assets/images/card/aptos.jpg';

<<<<<<< HEAD
export default function CardNFTUser({ item }: { item: any }) {
	let creator =
		item.creator.slice(0, 6) +
		'...' +
		item.creator.slice(item.creator.length - 4, item.creator.length);
=======
const CardNFTUser = ({ item }: { item: any }) => {
	// let [test, setTest] = useState<string>();
>>>>>>> dev-tun

	let creator =
		item.creator.slice(0, 6) +
		'...' +
		item.creator.slice(item.creator.length - 4, item.creator.length);
	// const funcTest = () => {
	// 	setTest(creator);
	// };
	// funcTest();
	const DECIMAL = 100000000;
	return (
		<>
			<Grid xs={6} sm={4} md={3} p={1}>
				<ItemCardStyle sx={{ boxShadow: 0 }}>
					<Box sx={{ p: 1.5, fontStyle: 'italic' }}>
						{/* Item image */}
						<ItemImage>
							<Box className="main-img">
								<img src={item.uri} alt="item" />
							</Box>
							{/* Item favorite */}
							<ItemFavorite>
								<Box mr={1.5}>
									{/* <TwitterShareButton
									url={`${RELATED_URLS.MetaSpacecyHomePage}/#${PATH_ITEM.detail}/${item?._id}`}
									title={`Look what I found! ${item?.itemName} collectible`}
									hashtags={['Music', 'Game']}
									via="Metaspacecy"
									style={{ width: '100%' }}
								>
									<img src={TwitterIcon} alt="icon twitter" />
								</TwitterShareButton> */}
									<img src={TwitterIcon} alt="icon twitter" />
								</Box>
								<Box>
									<Stack direction="row" alignItems="center" spacing={0.5}>
										<Box
											sx={{
												cursor: 'pointer',
											}}
										>
											{/* {likeState ? (
											<IconFavorite src={HeartFullRed} alt="icon favorite" />
										) : (
											<IconFavorite src={HeartWhite} alt="icon favorite" />
										)} */}
											<IconFavorite src={HeartFullRed} alt="icon favorite" />
										</Box>
										<Typography variant="body1">1</Typography>
									</Stack>
								</Box>
							</ItemFavorite>
						</ItemImage>

						{/* Item info */}
						<ItemContent sx={{ pt: 4, height: '120px' }}>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="space-between"
								spacing={1}
							>
								<Box
									sx={{
										width: '70%',
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										gap: '8px',
									}}
								>
									<Typography
										variant="subtitle1"
										fontWeight="500"
										noWrap
										sx={{ cursor: 'default' }}
									>
										{item.name}
									</Typography>
									<ImageBlockchain>
										<img src={aptos} alt="aptos" />
									</ImageBlockchain>
								</Box>
							</Stack>
							<Box sx={{ height: '21px' }}>
								<Typography fontSize="14px"></Typography>
							</Box>
							<Box>
								<Stack
									direction="row"
									alignItems="end"
									justifyContent="space-between"
									spacing={1}
									sx={{ paddingTop: '15px' }}
								>
									<Box sx={{ display: 'flex', gap: '5px' }}>
										{/* <img src={HistoryIcon} alt="history" />
													<span
														style={{
															fontWeight: 500,
															fontSize: '14px',
															color: '#5A5D79',
														}}
													>
														View History
													</span> */}
										creator : {creator}
									</Box>

									<Typography
										variant="body2"
										sx={{
											fontWeight: '600',
											// cursor:
											// 	item.status === ITEM_STATUS.BUY_NOW
											// 		? 'pointer'
											// 		: 'no-drop',
											// opacity: '0.85',
											// color:
											// 	item.status === ITEM_STATUS.BUY_NOW
											// 		? theme.palette.text.special
											// 		: 'rgba(0,0,0,0.3)',

											// ...(theme.palette.mode === 'light'
											// 	? {
											// 		color:
											// 			item.status ===
											// 				ITEM_STATUS.BUY_NOW
											// 				? theme.palette.text
											// 					.special
											// 				: 'rgba(0,0,0,0.3)',
											// 	}
											// 	: {
											// 		color:
											// 			item.status ===
											// 				ITEM_STATUS.BUY_NOW
											// 				? theme.palette.text
											// 					.special
											// 				: 'rgba(255,255,255,0.5)',
											// 	}),
											'&:hover': {
												opacity: '1',
											},
										}}
									></Typography>
								</Stack>
							</Box>
						</ItemContent>
					</Box>
				</ItemCardStyle>
			</Grid>
		</>
	);
};
export default CardNFTUser;
