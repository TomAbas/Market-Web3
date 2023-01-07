/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import Slider from 'components/Slider';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardNFT from './CardNFT';
import { getListItemResource } from '../../utils/dataResource';
import item from '../../assets/images/card/box.webp';

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
	ItemImage,
} from './styled';
import Newsletter from './NewsLetter';

export default function Marketplace() {
	const [offers, setOffers] = useState<any[]>([]);
	const [collections, setCollections] = useState<any[]>([]);
	let navigate = useNavigate();
	useEffect(() => {
		const fetchOffers = async () => {
			const newOffers = await getListItemResource();
			setOffers(newOffers);
		};
		fetchOffers();
	}, []);

	useEffect(() => {
		let newCollection = new Map();
		offers.map((item) => {
			let collection = newCollection.get(
				item?.token_id.token_data_id.collection +
					'/////' +
					item?.token_id.token_data_id.creator
			);
			if (!collection) {
				newCollection.set(
					item?.token_id.token_data_id.collection +
						'/////' +
						item?.token_id.token_data_id.creator,
					[item]
				);
			} else {
				collection.push(item);
				newCollection.set(
					item?.token_id.token_data_id.collection +
						'/////' +
						item?.token_id.token_data_id.creator,
					collection
				);
			}
		});
		let newArrCollection = Array.from(newCollection);
		if (newArrCollection.length > 4) {
			newArrCollection = newArrCollection.slice(0, 4);
		}
		setCollections(newArrCollection);
	}, [offers]);
	console.log(offers);
	console.log(collections);

	const handleCollectionDetail = (creator: string, collection: string) => {
		//encodeURIComponent
		navigate(
			`/collection-detail?creator=${encodeURIComponent(
				creator
			)}&collection=${encodeURIComponent(collection)}`
		);
	};

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
								href="#/mint"
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
								href="#/view-all"
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
				<Typography variant="h2" textAlign="center" fontWeight="500">
					Explore NFT
				</Typography>
				<Typography
					variant="h5"
					textAlign="center"
					mb={3}
					mt={1}
					sx={{ color: 'rgba(29, 29, 31, 0.5)' }}
				>
					The world of digital assets in forms of NFTs{' '}
					<Link href="#/view-all" sx={{ textDecoration: 'none' }}>
						View All
					</Link>
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
			<ExploreCollection sx={{ pt: 4 }}>
				<Container maxWidth="xl" sx={{}}>
					<Box sx={{ mt: 0, mb: 4 }}>
						<HeaderSection>
							<MainHeader variant="h2" fontWeight="500" fontStyle="italic">
								Metaspacecy is the universal NFT marketplace
							</MainHeader>
						</HeaderSection>

						<Newsletter />
					</Box>
				</Container>
				<HotService>
					<ServiceTitle>
						Join our mailing list to stay in the loop with our latest feature releases,
						<br />
						NFT drops, and tips and tricks for navigating Metaspacecy
					</ServiceTitle>
					<EmailSearch
						sx={{
							input: {
								'::placeholder': {
									fontSize: '16px',
									fontStyle: 'italic',
								},
							},
						}}
					>
						<input type="text" placeholder="Email address" />
						<Box
							sx={{
								button: {
									padding: '10px 30px',
									border: '1.5px solid #e7e8ec',
									transition: 'all 0.4s',
									borderRadius: '12px',
									fontWeight: 500,
									background: '#fff',
									fontSize: '16px',
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
							<button>Subscribe</button>
						</Box>
					</EmailSearch>
				</HotService>
			</ExploreCollection>
			<Box sx={{ maxWidth: '1350px', mx: 'auto', pt: 3, pb: 4 }}>
				<Box sx={{ textAlign: 'center', mb: 4 }}>
					<Typography variant="h2" fontWeight={500}>
						Featured Collections
					</Typography>
				</Box>
				<Grid container spacing={1}>
					{collections.map((collection, index: any) => (
						<Grid
							xs={6}
							sm={4}
							md={3}
							p={1}
							key={index}
							onClick={() => {
								handleCollectionDetail(
									collection[0].split('/////')[1],
									collection[0].split('/////')[0]
								);
							}}
						>
							<Link
								href={`https://explorer.aptoslabs.com/account/${
									collection[0].split('/////')[1]
								}`}
								target="_blank"
								sx={{
									textDecoration: 'none',
									color: '#131740',
									'&:hover': {
										boxShadow: '0px 3px 6px rgb(13 16 45 / 25%)',
									},
								}}
							>
								<Box
									sx={{
										border: '1.5px solid #e7e8ec',
										borderRadius: '12px',
										overflow: 'hidden',
										cursor: 'pointer',
										transition: 'all 0.4s',
										padding: '12px 12px 0',
										background: '#fff',
										'&:hover': {
											boxShadow: '0px 3px 6px rgb(13 16 45 / 25%)',
										},
									}}
								>
									<ItemImage>
										<Box className="main-img">
											<img src={collection[1][0].uri} alt="collection" />
										</Box>
									</ItemImage>

									<Box py={1.5}>
										<Typography variant="h6">
											{collection[0].split('/////')[0]}
										</Typography>
										<Stack
											mt={1}
											direction="row"
											alignItems="center"
											justifyContent="space-between"
											gap={1}
										>
											<Stack direction="row" gap={1} alignItems="center">
												<Box
													sx={{
														img: {
															width: '32px',
															height: '32px',
															objectFit: 'cover',
															objectPosition: 'center',
															borderRadius: '50%',
														},
													}}
												>
													<img src={item} alt="collection" />
												</Box>
												<Typography variant="body1">
													{collection[0].split('/////')[1].slice(0, 6) +
														'...' +
														collection[0]
															.split('/////')[1]
															.slice(
																collection[0].split('/////')[1]
																	.length - 4,
																collection[0].split('/////')[1]
																	.length
															)}
												</Typography>
											</Stack>
											<Box>
												<Typography variant="body1">
													{collection[1].length} items
												</Typography>
											</Box>
										</Stack>
									</Box>
								</Box>
							</Link>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
}
