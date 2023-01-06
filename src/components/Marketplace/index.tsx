/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Slider from 'components/Slider';
import React, { useState, useEffect } from 'react';
import CardNFT from './CardNFT';
import { getListItemResource } from '../../utils/dataResource';

import {
	ButtonBlue,
	ButtonViewAll,
	ExploreCollection,
	FirstSectionHomePage,
	HeaderSection,
	HeaderSection1,
	HeaderVideoContainer,
	ImgCatchAFish,
	MainHeader,
	OpacityBackground,
	SubHeader,
	TitleWrapper,
	VideoHeader,
	BlurBackGround,
	BlurBackGround1,
	HotService,
	ServiceTitle,
	EmailSearch,
	SubTitle,
	LinkWrapper,
} from './styled';

export default function Marketplace() {
	const [offers, setOffers] = useState<any[]>([]);
	useEffect(() => {
		const fetchOffers = async () => {
			const newOffers = await getListItemResource();
			setOffers(newOffers);
		};
		fetchOffers();
	}, []);
	console.log(offers);
	return (
		<>
			<ExploreCollection
				sx={{
					paddingTop: '100px',
				}}
			>
				<Container maxWidth="xl">
					<Box>
						<HeaderSection sx={{ marginTop: '30px' }}>
							<MainHeader variant="h1" fontWeight="600" fontStyle="italic">
								Discover, Collect & Sell
							</MainHeader>
							<SubTitle variant="h1" fontWeight="600" fontStyle="italic">
								Creative NFTs
							</SubTitle>
						</HeaderSection>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								gap: '50px',
								my: '30px',
							}}
						>
							<LinkWrapper
								href=""
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
										a: {
											textDecoration: 'none',
											'&:hover': {
												textDecoration: 'none',
												color: '#fff',
											},
										},
									},
								}}
							>
								<button>Create</button>
							</LinkWrapper>

							<LinkWrapper
								href=""
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
										a: {
											textDecoration: 'none',
											'&:hover': {
												textDecoration: 'none',
												color: '#fff',
											},
										},
									},
								}}
							>
								<button>Explore</button>
							</LinkWrapper>
						</Box>
					</Box>
				</Container>
				<Box px={3}>
					<Box
						maxWidth={1800}
						mx="auto"
						fontStyle="italic"
						sx={
							{
								// [theme.breakpoints.down(829)]: {
								// 	maxWidth: 500,
								// },
								// [theme.breakpoints.down(548)]: {
								// 	maxWidth: 350,
								// },
							}
						}
					>
						<Slider />
					</Box>
				</Box>
				<Typography variant="h2" textAlign="center" fontWeight="500" mb={3}>
					Explore NFT
				</Typography>
				<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
					{offers.map((offer: any, index: any) => (
						<CardNFT
							offers={offers}
							offer={offer}
							setOffers={setOffers}
							index={index}
							key={index}
						/>
					))}
				</Grid>
			</ExploreCollection>
		</>
	);
}
