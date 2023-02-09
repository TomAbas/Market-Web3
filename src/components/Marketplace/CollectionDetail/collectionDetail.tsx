/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography, Skeleton } from '@mui/material';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import CardNFT from 'components/Marketplace/CardNFT';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTokens } from '../../../hooks/useTokens';
import { getListItemResource } from '../../../utils/dataResource';
import banner from '../../../assets/banner.png';
import aptos from '../../../assets/images/card/aptos.jpg';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { getCollectionData } from '../../../service/aptos.service';
import SkeletonCardNft from 'components/SkeletonCardNft';
import useInteraction from 'hooks/useInteraction';
import { getItemOfCollection } from 'api/collectionApi';
import { useAppSelector } from 'redux/hooks';
import { selectTrigger } from 'redux/slices/nftFilter';
const CollectionDetail = () => {
	const desRef: any = useRef();
	const [show, setShow] = useState(false);
	const { collectionId } = useParams();
	let arr = [1, 2, 3, 4];
	const { checkIsLike, likeItem } = useInteraction();
	const [offers, setOffers, loadingOffers] = useOutletContext<any>();
	const search = useLocation().search;
	const [collectionInfo, setCollectionInfo] = useState<any>('');
	const [loadingCollectionImg, setLoadingCollectionImg] = useState(true);
	const triggerFetchNft = useAppSelector(selectTrigger);
	async function fetchCollectionItems() {
		let collection = await getItemOfCollection(collectionId!).then((res: any) => res.data);
		setCollectionInfo(collection);
		setLoadingCollectionImg(false);
	}
	useEffect(() => {
		fetchCollectionItems();
	}, [triggerFetchNft]);
	useEffect(() => {
		console.log(collectionInfo);
	}, [collectionInfo]);
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
								<img src={collectionInfo?.logo} alt="banner" />
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
									<img src={collectionInfo?.logo} alt="avatar" />
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
						<img src={collectionInfo?.logo} alt="banner" />
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
							<img src={collectionInfo?.logo} alt="avatar" />
						</Box>
					</Box>
				)}
				<Box pt={8} sx={{ maxWidth: '1440px', mx: 'auto', textAlign: 'center' }}>
					<Box sx={{ width: '100%' }}>
						<Typography variant="h4" fontWeight="500">
							{collectionInfo.collectionName}
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
								{collectionInfo.userAddress?.slice(0, 6) +
									'...' +
									collectionInfo.userAddress?.slice(
										collectionInfo.userAddress?.length - 4,
										collectionInfo.userAddress?.length
									)}
							</Box>
						</Stack>
						<Typography
							sx={{
								transition: 'max-height 0.5s ease ',
								margin: '16px auto',
								padding: '0px 24px',
								width: '100%',
								whiteSpace: `${show ? 'unset' : 'nowrap'}`,
								maxHeight: `${show ? '500px' : '49px'}`,
								height: `${show ? 'auto' : '49px'}`,
								textAlign: ` ${
									desRef.current?.offsetHeight > 50 ? 'justify' : 'center'
								}`,
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
							ref={desRef}
							onClick={() => {
								if (desRef.current?.offsetHeight < 48) {
									return;
								}
								console.log(desRef.current?.offsetHeight);
								setShow(!show);
							}}
						>
							{collectionInfo.description}
						</Typography>
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
									{collectionInfo?.listItem?.map((offer: any, index: any) => (
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
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default CollectionDetail;
