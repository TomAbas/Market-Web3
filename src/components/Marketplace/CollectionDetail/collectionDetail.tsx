/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography, Skeleton, Tooltip } from '@mui/material';
import CardNFT from 'components/Marketplace/CardNFT';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { TwitterShareButton } from 'react-share';
import aptos from '../../../assets/images/card/aptos.jpg';
import HeartBlack from 'assets/icons/icon-heart-black.svg';
import AddIcon from '@mui/icons-material/Add';
import IconReload from 'assets/icons/icon-reload.svg';
import Share from 'assets/icons/share-black.webp';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import SkeletonCardNft from 'components/SkeletonCardNft';
import useInteraction from 'hooks/useInteraction';
import { getItemOfCollection } from 'api/collectionApi';
import { useAppSelector } from 'redux/hooks';
import { selectTrigger } from 'redux/slices/nftFilter';
import { displayAddress } from 'utils/formatDisplay';
import { DetailCollectionStatistic } from './DetailStatistic';
import { FeatureWrapper } from '../styled';
import FilterPrice from '../FilterItem/FilterPrice';
import FilterStatus from '../FilterItem/FilterStatus/FilterStatus';
import { InputItem } from 'components/Mint/styled';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import { RELATED_URLS } from 'constants/index';
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
	const navigate = useNavigate();
	async function fetchCollectionItems() {
		let collection = await getItemOfCollection(collectionId!).then((res: any) => res.data);
		console.log(collection);
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
							<Box>{displayAddress(collectionInfo?.userAddress)}</Box>
						</Stack>
						<Box sx={{ width: '500px', mx: 'auto', mt: 2 }}>
							<DetailCollectionStatistic
								numberItems={collectionInfo?.listItem?.length}
								numberOwners={1}
								floorPrice={0}
								volumeTrades={0}
							/>
						</Box>
						<Typography
							sx={{
								transition: 'max-height 0.5s ease ',
								margin: '16px auto',
								padding: '0px 24px',
								width: '100%',
								whiteSpace: `${show ? 'unset' : 'nowrap'}`,
								maxHeight: `${show ? '500px' : '49px'}`,
								height: `${show ? 'auto' : '49px'}`,
								textAlign: ` ${show ? 'center' : 'center'}`,
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
							ref={desRef}
							onClick={() => {
								if (desRef.current?.offsetHeight < 48) {
									return;
								}
								setShow(!show);
							}}
						>
							{collectionInfo.description}
						</Typography>
					</Box>
					<Stack
						direction="row"
						alignItems="stretch"
						justifyContent="center"
						spacing={2}
						sx={{ mt: 4, mx: 'auto' }}
					>
						<FeatureWrapper sx={{ padding: '14px 14px' }}>
							<img
								src={HeartBlack}
								alt="icon heart"
								style={{ width: '20px', height: '20px' }}
							/>
						</FeatureWrapper>
						<TwitterShareButton
							url={`${RELATED_URLS.MetaSpacecyHomePage}/#/collection-detail/${collectionInfo?._id}`}
							title={`Look what I found! Collection ${collectionInfo?.collectionName}`}
							// hashtags={['Music', 'Game']}
							via="Metaspacecy"
							style={{ textAlign: 'left' }}
						>
							<FeatureWrapper sx={{ padding: '14px 15px' }}>
								<img src={Share} alt="icon share" style={{ height: '20px' }} />
							</FeatureWrapper>
						</TwitterShareButton>
						<FeatureWrapper sx={{ padding: '14px 14px' }}>
							<img
								src={IconReload}
								alt="icon heart"
								style={{ width: '20px', height: '20px' }}
							/>
						</FeatureWrapper>
					</Stack>
					<Box sx={{ display: 'flex', width: 'auto', justifyContent: 'space-between' }}>
						<Box sx={{ display: 'flex', width: 'auto', gap: '20px' }}>
							<FilterPrice />
							<FilterStatus />
						</Box>
						<Box sx={{ display: 'flex', width: 'auto', gap: '20px' }}>
							<InputItem sx={{ marginTop: '0' }}>
								<input
									type="text"
									placeholder="Search name ..."
									// {...register('name', { required: true })}
									// onChange={checkCollectionNameValid}
								/>
							</InputItem>
							<Tooltip
								title="Add Item"
								placement="top"
								arrow
								sx={{ marginLeft: 'auto' }}
							>
								<Box>
									<ButtonWhite
										sx={{
											py: '10px',
											minWidth: '46px',
											mb: 0,
											background: '#fff',
											border: '1px solid #E7E8EC',
											px: 0,
										}}
										onClick={() => navigate(`/mint?query=2`)}
									>
										<AddIcon />
									</ButtonWhite>
								</Box>
							</Tooltip>
						</Box>
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
