/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import CardNFTUser from 'components/Marketplace/CardNFTUser';
import React from 'react';
import { useTokens } from '../../hooks/useTokens';
import banner from '../../assets/banner.png';
import aptos from '../../assets/images/card/aptos.jpg';

const ProfileUser = () => {
	const { account } = useWallet();
	const { tokens, loading } = useTokens(account);
	let myAddress = account?.address?.toString() || '';
	myAddress =
		myAddress.slice(0, 6) + '...' + myAddress.slice(myAddress.length - 4, myAddress.length);
	// const creator =
	// 	item.creator.slice(0, 6) + '...' + item.creator.slice(item.length - 4, item.creator.length);
	console.log(tokens);
	return (
		<>
			<Box pt={13}>
				<Box
					sx={{
						position: 'relative',
						img: {
							width: '100%',
							objectFit: 'cover',
							objectPosition: 'center',
							height: '300px',
						},
					}}
				>
					<img src={banner} alt="banner" />
					<Box
						sx={{
							position: 'absolute',
							left: '50%',
							bottom: '-50px',
							transform: 'translateX(-50%)',
							border: '2px solid #fff',
							borderRadius: '10px',
							img: {
								width: '100px',
								height: '100px',
								objectFit: 'cover',
								objectPosition: 'center',
								borderRadius: '10px',
							},
						}}
					>
						<img src={banner} alt="avatar" />
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
							<Box>{myAddress}</Box>
						</Stack>
					</Box>
					<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
						{tokens.map((item: any) => (
							<CardNFTUser item={item} key={item.uri} />
						))}
					</Grid>
				</Box>
			</Box>
		</>
	);
};

export default ProfileUser;
