/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, ClickAwayListener, Grid, Stack, Typography } from '@mui/material';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import CardNFTUser from 'components/Marketplace/CardNFTUser';
import React, { useState, useEffect } from 'react';
import banner from '../../assets/banner.png';
import aptos from '../../assets/images/card/aptos.jpg';
import { useSizeObersver } from 'contexts/SizeObserver';
import CardNFTCollection from 'components/Marketplace/CardNFTCollection';

const CollectionDetail = () => {
	const { innerWidth } = useSizeObersver();
	const [viewFull, setViewFull] = useState(false);
	const [viewAvatar, setViewAvatar] = useState(false);
	const [items, setItems] = useState<any[]>([]);

	const innerHeight = innerWidth / 4.5;

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
							<Box></Box>
						</Stack>
					</Box>
					<Box py={4}>
						{/* <Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
							{items.map((item: any, index: any) => (
								<CardNFTCollection
									item={item}
									handleItems={handleItems}
									index={index}
									key={index}
								/>
							))}
						</Grid> */}
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

export default CollectionDetail;