/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Slider from 'components/Slider';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import item from '../../assets/images/card/box.webp';
import ethe from '../../assets/images/card/Ethereum-icon.svg';
import CardNFT from './CardNFT';

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
	const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL;
	const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
	const MARKET_RESOURCE_ADDRESS = process.env.REACT_APP_MARKET_RESOURCE_ADDRESS;
	const [offers, setOffers] = useState<any[]>([]);
	useEffect(() => {
		const fetchOffers = async () => {
			const response: any = await axios.get(
				`${APTOS_NODE_URL}/accounts/${MARKET_RESOURCE_ADDRESS}/resource/${MARKET_ADDRESS}::market::TokenInfo`
			);
			const offers = response.data.data?.token_list;
			offers.reverse();
			setOffers(offers);
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
			</ExploreCollection>
			<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
				{offers.map((offer: any) => (
					<CardNFT offer={offer} key={offer.timestamp} />
				))}
			</Grid>
		</>
	);
}
