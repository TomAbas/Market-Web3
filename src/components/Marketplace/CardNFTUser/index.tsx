/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
	ImageBlockchain,
	ItemCardStyle,
	ItemContent,
	ContentFooter,
	ItemImage,
	ItemFavorite,
	IconFavorite,
} from './styled';

import TwitterIcon from '../../../assets/icons/twitter-white.svg';
import HeartFullRed from '../../../assets/icons/heart-full-red.svg';
import HeartFullWhite from '../../../assets/icons/heart-white.svg';
import item from '../../../assets/images/card/box.webp';
import aptos from '../../../assets/images/card/aptos.jpg';

const CardNFTUser = ({ item, handleItems }: { item: any; handleItems: any }) => {
	const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
	const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL;
	const MARKET_COINT_TYPE = '0x1::aptos_coin::AptosCoin';
	let creator =
		item.creator.slice(0, 6) +
		'...' +
		item.creator.slice(item.creator.length - 4, item.creator.length);
	const { signAndSubmitTransaction } = useWallet();
	const [open, setOpen] = useState(false);
	const [supply, setSupply] = useState('');
	const [price, setPrice] = useState('');
	const [statusList, setStatusList] = useState('List');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleListItem = async () => {
		try {
			setStatusList('Listing...');
			console.log(supply + ' ' + price);
			const payload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::market::list_token`,
				type_arguments: [MARKET_COINT_TYPE],
				arguments: [item.creator, item.collection, item.name, '0', item.supply, price],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 });
			setStatusList('List');
			handleItems(item.name, item.collection, item.creator);
			setOpen(false);
		} catch (error) {
			setStatusList('List');
			setOpen(false);
		}
	};

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

									{/* <Typography
										variant="body2"
										sx={{
											fontWeight: '600',
											'&:hover': {
												opacity: '1',
											},
										}}
									>
										List Item
									</Typography> */}
									<div>
										<Typography
											variant="body2"
											onClick={handleClickOpen}
											sx={{
												fontWeight: '600',
												'&:hover': {
													opacity: '1',
												},
											}}
										>
											List Item
										</Typography>
										<Dialog open={open} onClose={handleClose}>
											<DialogTitle>List Item</DialogTitle>
											<DialogContent>
												<TextField
													autoFocus
													margin="dense"
													id="name"
													label="Supply"
													type="text"
													fullWidth
													variant="standard"
													value={supply}
													onChange={(e) => setSupply(e.target.value)}
												/>
											</DialogContent>
											<DialogContent>
												<TextField
													autoFocus
													margin="dense"
													id="price"
													label="Price"
													type="text"
													fullWidth
													variant="standard"
													value={price}
													onChange={(e) => setPrice(e.target.value)}
												/>
											</DialogContent>
											<DialogActions>
												<Button onClick={handleClose}>Cancel</Button>
												<Button onClick={handleListItem}>
													{statusList}
												</Button>
											</DialogActions>
										</Dialog>
									</div>
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
