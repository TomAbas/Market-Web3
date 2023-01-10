import { Box, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import useControlModal from 'hooks/useControlModal';
// import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
// import { useAppDispatch } from '../../../redux/hooks';
// import { openFirstModal } from '../../../redux/slices/modalWallet';
import { useTokens } from '../../../hooks/useTokens';
import { ItemImage } from '../styled';

const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE || '';
const DECIMAL = 100000000;

export default function MyItemDetail() {
	const search = useLocation().search;
	const creator = decodeURIComponent(new URLSearchParams(search).get('creator') || '');
	const collection = decodeURIComponent(new URLSearchParams(search).get('collection') || '');
	const name = decodeURIComponent(new URLSearchParams(search).get('name') || '');
	const { account, signAndSubmitTransaction } = useWallet();
	const { tokens } = useTokens(account);
	let myAddress = account?.address?.toString() || '';
	console.log(tokens);
	const [supply, setSupply] = useState('');
	const [price, setPrice] = useState('');
	const [open, setOpen] = useState(false);
	const [statusSell, setStatusSell] = useState('Sell');
	// const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [item, setItem] = useState<any>();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchOffers = async () => {
			const newItem = tokens.find(
				(item: any) =>
					item.creator === creator && item.collection === collection && item.name === name
			);
			setItem(newItem);
		};
		fetchOffers();
	}, [tokens]);

	const handleListItem = async () => {
		try {
			if (!supply || !price || supply == '0' || price == '0') {
				return;
			}
			let newPrice = parseFloat(price) * DECIMAL;
			setStatusSell('Listing...');
			console.log(supply + ' ' + newPrice);
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
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 });
			setStatusSell('Sell');
			navigate('/');
			setOpen(false);
		} catch (error) {
			setStatusSell('Sell');
			setOpen(false);
		}
	};

	return (
		<>
			<Box sx={{ pt: 16, pb: 4, maxWidth: '1440px', mx: 'auto' }}>
				<Stack direction="row" gap={4}>
					<ItemImage sx={{ width: '50%', paddingTop: '50%' }}>
						<Box className="main-img">
							<img src={item?.uri} alt="item" />
						</Box>
					</ItemImage>
					<Stack gap="16px" sx={{ width: '50%' }}>
						<Typography variant="h6" fontWeight={500} sx={{ color: '#007aff' }}>
							{item?.collection}
						</Typography>
						<Typography variant="h4" fontWeight={500}>
							{item?.name}
						</Typography>
						<p>{item?.description}</p>
						<Typography variant="body1">
							Owner:{' '}
							<a
								href={`https://explorer.aptoslabs.com/account/${item?.owner}`}
								target="_blank"
							>
								{myAddress?.slice(0, 6) +
									'...' +
									myAddress?.slice(myAddress?.length - 4, myAddress?.length)}
							</a>
						</Typography>
						<Typography variant="body1">
							Creator:
							<a
								href={`https://explorer.aptoslabs.com/account/${item?.creator}`}
								target="_blank"
							>
								{item?.creator.slice(0, 6) +
									'...' +
									item?.creator.slice(
										item?.creator.length - 4,
										item?.creator.length
									)}
							</a>
						</Typography>
						<Typography variant="body1"></Typography>
						<Box
							sx={{
								button: {
									padding: '10px 30px',
									border: '1.5px solid #e7e8ec',
									transition: 'all 0.4s',
									borderRadius: '12px',
									fontWeight: 500,
									background: '#fff',
									fontSize: '20px',
									cursor: 'pointer',
									fontFamily: 'Montserrat, sans-serif !important',
									fontStyle: 'italic !important',
									width: '180px',
									'&:hover': {
										background: '#007aff',
										borderColor: 'transparent',
										color: '#fff',
									},
								},
							}}
						>
							<button onClick={handleClickOpen}>{statusSell}</button>
						</Box>
					</Stack>
					<div>
						{/* <Typography
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
						</Typography> */}
						<Dialog open={open} onClose={handleClose}>
							<DialogTitle>Sell Item</DialogTitle>
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
								<Button onClick={handleListItem}>{statusSell}</Button>
							</DialogActions>
						</Dialog>
					</div>
				</Stack>
			</Box>
		</>
	);
}
