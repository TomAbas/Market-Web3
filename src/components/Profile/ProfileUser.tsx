/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, ClickAwayListener, Grid, Stack, Typography } from '@mui/material';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import CardNFTUser from 'components/Marketplace/CardNFTUser';
import React, { useState, useEffect } from 'react';
import { useTokens } from '../../hooks/useTokens';
import banner from '../../assets/banner.png';
import aptos from '../../assets/images/card/aptos.jpg';
import { useSizeObersver } from 'contexts/SizeObserver';
import editIcon from '../../assets/icons/icon-edit.svg';

const ProfileUser = () => {
	const { account } = useWallet();
	const { innerWidth } = useSizeObersver();
	const [viewFull, setViewFull] = useState(false);
	const [viewAvatar, setViewAvatar] = useState(false);
	// console.log(account);
	const { tokens, loading } = useTokens(account);
	const [items, setItems] = useState<any[]>([]);

	const innerHeight = innerWidth / 4.5;

	let myAddress = account?.address?.toString() || '';
	useEffect(() => {
		console.log('reset');
		setItems(tokens);
	}, [tokens]);
	const handleItems = (index: any) => {
		let newItems = items.filter((_item, i) => i !== index);
		setItems(newItems);
	};
	console.log(items);
	// console.log(tokens);
	const handleClickAway = () => {
		setViewFull(false);
	};
	const handleClickAvatar = () => {
		setViewAvatar(false);
	};
	return (
		<>
			<Box pt={13}>
				<Box
					sx={{
						position: 'relative',
						display: 'flex',
						justifyContent: 'center',
						'& > img': {
							width: '100%',
							objectFit: 'cover',
							objectPosition: 'center',
							height: innerHeight,
							cursor: 'pointer',
						},
					}}
				>
					<ClickAwayListener onClickAway={handleClickAway}>
						<img
							src={banner}
							alt="banner"
							onClick={() => {
								setViewFull(true);
							}}
						/>
					</ClickAwayListener>

					<Box
						sx={{
							position: 'absolute',
							left: '50%',
							bottom: '-60px',
							transform: 'translateX(-50%)',
							border: '2px solid #fff',
							borderRadius: '10px',
							img: {
								width: '120px',
								height: '120px',
								objectFit: 'cover',
								objectPosition: 'center',
								borderRadius: '10px',
								display: 'block',
							},
						}}
					>
						<ClickAwayListener onClickAway={handleClickAvatar}>
							<img
								src={banner}
								alt="avatar"
								onClick={() => {
									setViewAvatar(true);
								}}
							/>
						</ClickAwayListener>
					</Box>
					<Box
						sx={{
							position: 'absolute',
							right: '30px',
							bottom: '20px',
							button: {
								padding: '10px 30px',
								border: '1.5px solid #e7e8ec',
								transition: 'all 0.4s',
								borderRadius: '12px',
								fontWeight: 500,
								background: 'rgba(157, 195, 230, 0.6)',
								fontSize: '16px',
								cursor: 'pointer',
								fontFamily: 'Montserrat, sans-serif !important',
								fontStyle: 'italic !important',
								width: '180px',
								color: '#fff',
								'&:hover': {
									background: '#9DC3E6',
									borderColor: 'transparent',
								},
								img: {
									width: '20px',
								},
								display: 'flex',
								alignItems: 'center',
								gap: '6px',
							},
						}}
					>
						<button>
							<img src={editIcon} alt="edit" />
							<Box>Edit Profile</Box>
						</button>
					</Box>
				</Box>
				<Box pt={8} sx={{ maxWidth: '1440px', mx: 'auto', textAlign: 'center' }}>
					<Box sx={{ width: '100%' }}>
						<Typography variant="h4" fontWeight="500">
							Test
						</Typography>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="center"
							gap={1}
							sx={{
								background: '#fff',
								padding: '8px 32px',
								width: 'fit-content',
								mx: 'auto',
								mt: 2,
								border: '1.5px solid #E7E8EC',
								borderRadius: '12px',
								img: {
									width: '24px',
								},
							}}
						>
							<img src={aptos} alt="aptos" />
							<Box>
								{myAddress.slice(0, 6) +
									'...' +
									myAddress.slice(myAddress.length - 4, myAddress.length)}
							</Box>
						</Stack>
					</Box>
					<Box py={4}>
						<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
							{items.map((item: any, index: any) => (
								<CardNFTUser
									item={item}
									handleItems={handleItems}
									index={index}
									key={index}
								/>
							))}
						</Grid>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					position: 'fixed',
					display: viewFull ? '' : 'none',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					zIndex: 9999,
					background: 'rgba(0,0,0,0.4)',
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						width: '70%',
						img: {
							width: '100%',
							height: '100%',
						},
					}}
				>
					<img src={banner} alt="banner" />
				</Box>
			</Box>
			<Box
				sx={{
					position: 'fixed',
					display: viewAvatar ? '' : 'none',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					zIndex: 9999,
					background: 'rgba(0,0,0,0.4)',
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						width: '50%',
						img: {
							width: '100%',
							height: '100%',
						},
					}}
				>
					<img src={banner} alt="banner" />
				</Box>
			</Box>
		</>
	);
};

export default ProfileUser;
