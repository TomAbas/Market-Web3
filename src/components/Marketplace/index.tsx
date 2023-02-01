/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Grid, Link, Stack, Typography, Skeleton } from '@mui/material';
import Slider from 'components/Slider';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardNFT from './CardNFT';
import { getListItemResource, getListCollectionMarketplace } from '../../utils/dataResource';
import { getCollectionData } from '../../service/aptos.service';
import item from '../../assets/avatar_default.png';
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
import SkeletonCardNft from 'components/SkeletonCardNft';
import { useOutletContext } from 'react-router-dom';
import TopCollection from './TopCollection';
import FeaturedCollection from './FeaturedCollection';
import { getUserInfo } from 'api/userApi';
import { getAllItems } from 'api/items/itemsApi';
import { getAllCollections } from 'api/collections/collectionApi';
import useInteraction from 'hooks/useInteraction';

export default function Marketplace() {
	let arr = new Array(12);
	const { likeItem, checkIsLike } = useInteraction();
	const [offers, setOffers, loadingOffers] = useOutletContext<any>();
	const [collections, setCollections] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	let navigate = useNavigate();
	useEffect(() => {
		const fetchCollections = async () => {
			let newArrCollection = await getAllCollections('2').then((res) => res.data);
			setCollections(newArrCollection.slice(0, 4));
			setIsLoading(false);
		};
		fetchCollections();
	}, []);

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
							<MainHeader variant="h2" fontWeight="600" fontStyle="italic">
								Discover, Collect & Sell
							</MainHeader>
							<SubTitle variant="h2" fontWeight="600" fontStyle="italic">
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
								href="#/view-all/items"
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
				{/* top collection */}

				<TopCollection />

				{/* top collection end*/}
				<Typography variant="h2" textAlign="center" fontWeight="500">
					Explore NFTs
				</Typography>
				<Typography
					variant="h5"
					textAlign="center"
					mb={3}
					mt={1}
					sx={{ color: 'rgba(29, 29, 31, 0.5)' }}
				>
					The world of digital assets in form of NFTs{' '}
					<Link href="#/view-all/items/" sx={{ textDecoration: 'none' }}>
						View All
					</Link>
				</Typography>
				<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
					{loadingOffers ? (
						<>
							{arr.map((item, idx) => (
								<SkeletonCardNft key={idx} />
							))}
						</>
					) : (
						<>
							{offers.slice(0, 12).map((offer: any, index: any) => (
								<CardNFT
									itemLiked={checkIsLike}
									likeItem={likeItem}
									offers={offers}
									offer={offer}
									index={index}
									key={index}
									loadingOffers={loadingOffers}
								/>
							))}
						</>
					)}
				</Grid>
			</ExploreCollection>
			<Box sx={{ maxWidth: '1350px', mx: 'auto', pt: 4, pb: 4, px: 2 }}>
				<FeaturedCollection collections={collections} isLoading={isLoading} />
			</Box>
			<ExploreCollection sx={{ py: 4 }}>
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
		</>
	);
}
