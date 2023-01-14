/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useNavigate } from 'react-router-dom';
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
import MediaDisplayCard from '../MediaDisplayCard/MediaDisplayCard';
import TwitterIcon from '../../../assets/icons/twitter-white.svg';
import HeartFullRed from '../../../assets/icons/heart-full-red.svg';
import aptos from '../../../assets/images/card/aptos.jpg';
import { sellItem } from '../../../api/collectionApi';
import { Order } from '../../../models/collection';
import { toast } from 'react-toastify';

const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE || '0x1::aptos_coin::AptosCoin';
const DECIMAL = 100000000;

const CardNFTUser = ({ item, handleItems, index }: { item: any; handleItems: any; index: any }) => {
	const { account, signAndSubmitTransaction } = useWallet();
	const [open, setOpen] = useState(false);
	const [supply, setSupply] = useState('');
	const [price, setPrice] = useState('');
	const [statusList, setStatusList] = useState('Sell Item');
	const navigate = useNavigate();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleListItem = async () => {
		try {
			if (!supply || !price || supply == '0' || price == '0') {
				return;
			}
			let newPrice = parseFloat(price) * DECIMAL;
			setStatusList('Processing...');
			const payload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::market::list_token`,
				type_arguments: [MARKET_COINT_TYPE],
				arguments: [
					item.creator,
					item.collection,
					item.name,
					'0',
					supply,
					newPrice.toString(),
				],
			};

			// setStatusList('Sell Item');
			// handleItems(index);
			// setOpen(false);
			let hash = await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(
				(res) => res.hash
			);

			setStatusList('Sell Item');
			toast.success('Successfully listed an item');
			let listItem: any = {
				maker: account?.address?.toString(),
				chainId: '2',
				price: newPrice,
				quantity: supply,
				to: MARKET_ADDRESS,
				txHash: hash,
				itemName: item.name,
				collectionName: item.collection,
				owner: item.creator,
			};
			console.log(listItem);
			sellItem(listItem);
			navigate('/view-all');
			handleItems(index);
			setOpen(false);
		} catch (error) {
			setStatusList('Sell Item');
			setOpen(false);
		}
	};
	const handleClickItem = () => {
		navigate(
			`/my-item?creator=${encodeURIComponent(item?.creator)}&collection=${encodeURIComponent(
				item?.collection
			)}&name=${encodeURIComponent(item?.name)}`
		);
		console.log('1');
	};
	function handleValidateAmount(e: any) {
		console.log(e.target.value);
		console.log(item.supply);
		if (Number(e.target.value) > Number(item.supply)) {
			e.target.value = item.supply;
			setSupply(item.suppy);
		}
	}
	console.log(item);
	return (
		<>
			<Grid xs={6} sm={4} md={3} p={1}>
				<ItemCardStyle sx={{ boxShadow: 0 }}>
					<Box sx={{ p: 1.5, fontStyle: 'italic' }}>
						{/* Item image */}
						<ItemImage onClick={handleClickItem}>
							<Box className="main-img">
								{/* <img src={item.uri} alt="item" /> */}
								<MediaDisplayCard
									media={item?.uri}
									preview={TwitterIcon}
									name={item?.name}
								/>
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
										creator :{' '}
										{item.creator.slice(0, 6) +
											'...' +
											item.creator.slice(
												item.creator.length - 4,
												item.creator.length
											)}
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
									<Box>
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
											Sell Item
										</Typography>
										<Dialog
											open={open}
											onClose={handleClose}
											sx={{
												'.MuiDialog-container': {
													width: '440px',
													mx: 'auto',
													'.MuiDialog-paper': {
														width: '100%',
														borderRadius: '10px',
													},
												},
											}}
										>
											<DialogTitle sx={{ textAlign: 'center' }}>
												Sell Item
											</DialogTitle>
											<Box px={3} py={2}>
												<Typography variant="body1" fontWeight={500} mb={1}>
													Supply
												</Typography>
												<Box
													sx={{
														input: {
															border: '1.5px solid #e7e8ec',
															padding: '10px 24px',
															outline: 'none',
															borderRadius: '10px',
															fontSize: '18px',
															fontStyle: 'italic',
															width: '100%',
														},
													}}
												>
													<input
														type="number"
														value={supply}
														onInput={(e: any) =>
															(e.target.value = Math.abs(
																e.target.value
															))
														}
														onChange={handleValidateAmount}
														id="name"
														placeholder="0"
													/>
												</Box>
											</Box>
											<Box px={3} py={2}>
												<Typography variant="body1" fontWeight={500} mb={1}>
													Price
												</Typography>
												<Box
													sx={{
														input: {
															border: '1.5px solid #e7e8ec',
															padding: '10px 24px',
															outline: 'none',
															borderRadius: '10px',
															fontSize: '18px',
															fontStyle: 'italic',
															width: '100%',
														},
													}}
												>
													<input
														type="number"
														onInput={(e: any) =>
															(e.target.value = Math.abs(
																e.target.value
															))
														}
														onChange={(e) => setPrice(e.target.value)}
														value={price}
														id="price"
														placeholder="0"
													/>
												</Box>
											</Box>

											<Stack
												direction="row"
												pt={3}
												pb={4}
												justifyContent="center"
												gap="10px"
											>
												<Box
													onClick={handleClose}
													sx={{
														button: {
															padding: '8px 30px',
															border: '1.5px solid #e7e8ec',
															transition: 'all 0.4s',
															borderRadius: '12px',
															fontWeight: 500,
															background: '#fff',
															fontSize: '16px',
															cursor: 'pointer',
															fontFamily:
																'Montserrat, sans-serif !important',
															fontStyle: 'italic !important',
															'&:hover': {
																background: '#007aff',
																borderColor: 'transparent',
																color: '#fff',
															},
														},
													}}
												>
													<button>Cancel</button>
												</Box>
												<Box
													onClick={handleListItem}
													sx={{
														button: {
															padding: '8px 30px',
															border: '1.5px solid #e7e8ec',
															transition: 'all 0.4s',
															borderRadius: '12px',
															fontWeight: 500,
															background: '#fff',
															fontSize: '16px',
															cursor: 'pointer',
															fontFamily:
																'Montserrat, sans-serif !important',
															fontStyle: 'italic !important',
															'&:hover': {
																background: '#007aff',
																borderColor: 'transparent',
																color: '#fff',
															},
														},
													}}
												>
													<button>{statusList}</button>
												</Box>
											</Stack>
										</Dialog>
									</Box>
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
