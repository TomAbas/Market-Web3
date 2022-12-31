/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography } from '@mui/material';
import CardNFTUser from 'components/Marketplace/CardNFTUser';
import React from 'react';
import banner from '../../assets/banner.png';
import aptos from '../../assets/images/card/aptos.jpg';

const ProfileUser = () => {
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
							<Box>0x4317...e1bc</Box>
						</Stack>
					</Box>
					{/* <Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
						{offers.map((offer: any) => (
							<CardNFTUser offer={offer} key={offer.timestamp} />
						))}
					</Grid> */}
				</Box>
			</Box>
		</>
	);
};

export default ProfileUser;
