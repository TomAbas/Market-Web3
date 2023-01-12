/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography, Skeleton } from '@mui/material';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import CardNFT from 'components/Marketplace/CardNFT';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokens } from '../../../hooks/useTokens';
import { getListItemResource } from '../../../utils/dataResource';
import banner from '../../../assets/banner.png';
import aptos from '../../../assets/images/card/aptos.jpg';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { getCollectionData } from '../../../service/aptos.service';
import SkeletonCardNft from 'components/SkeletonCardNft';
const CollectionDetail = () => {
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const [items, setItems] = useState<any[]>([]);
	const [offers, setOffers, loadingOffers] = useOutletContext<any>();
	const search = useLocation().search;
	const [collectImage, setCollectionImage] = useState('');
	const [loadingCollectionImg, setLoadingCollectionImg] = useState(true);
	const creator = decodeURIComponent(new URLSearchParams(search).get('creator') || '');
	const collection = decodeURIComponent(new URLSearchParams(search).get('collection') || '');
	// console.log({ collection, creator });
	useEffect(() => {
		const fetchOffers = async () => {
			const newOffers = offers;
			let newItems = newOffers.filter(
				(item: any) =>
					item?.token_id?.token_data_id?.collection == collection &&
					item?.token_id?.token_data_id?.creator == creator
			);
			setItems(newItems);
			let collectionInfo = await getCollectionData(creator, collection);
			setCollectionImage(collectionInfo.uri);
			setLoadingCollectionImg(false);
		};
		fetchOffers();
	}, [offers]);
	// console.log(tokens);
	return (
		<>
			<Box pt={13}>
				{loadingCollectionImg ? (
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
						{' '}
						<Skeleton width="100%">
							<Box sx={{ height: '400px' }}>
								<img src={collectImage} alt="banner" />
							</Box>
						</Skeleton>
						<Box
							sx={{
								position: 'absolute',
								left: '50%',
								bottom: '0px',
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
							<Skeleton width="100%">
								<Box sx={{ width: '100px', height: '100px' }}>
									<img src={collectImage} alt="avatar" />
								</Box>
							</Skeleton>
						</Box>
					</Box>
				) : (
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
						<img src={collectImage} alt="banner" />
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
							<img src={collectImage} alt="avatar" />
						</Box>
					</Box>
				)}
				<Box pt={8} sx={{ maxWidth: '1440px', mx: 'auto', textAlign: 'center' }}>
					<Box sx={{ width: '100%' }}>
						<Typography variant="h4" fontWeight="500">
							{collection}
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
								{creator?.slice(0, 6) +
									'...' +
									creator?.slice(creator?.length - 4, creator?.length)}
							</Box>
						</Stack>
					</Box>
					<Box py={4}>
						<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
							{loadingOffers ? (
								<>
									{arr.map((item, idx) => (
										<SkeletonCardNft key={idx} />
									))}
								</>
							) : (
								<>
									{items.map((offer: any, index: any) => (
										<CardNFT
											offers={offers}
											offer={offer}
											setOffers={setItems}
											index={index}
											key={index}
											loadingOffers={loadingOffers}
										/>
									))}
								</>
							)}
						</Grid>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default CollectionDetail;
