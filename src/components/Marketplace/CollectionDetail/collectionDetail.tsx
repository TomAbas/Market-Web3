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
import { useOutletContext } from 'react-router-dom';
import SkeletonCardNft from 'components/Skeletons/SkeletonCardNft';
import useInteraction from 'hooks/useInteraction';
import { getItemOfCollection } from 'api/collectionApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { handleReset, selectTrigger, setFilter } from 'redux/slices/nftFilter';
import { displayAddress } from 'utils/formatDisplay';
import { DetailCollectionStatistic } from './DetailStatistic';
import { FeatureWrapper } from '../styled';
import FilterPrice from '../FilterItem/FilterPrice';
import FilterStatus from '../FilterItem/FilterStatus/FilterStatus';
import { InputItem } from 'components/Mint/styled';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import { RELATED_URLS } from 'constants/index';
import useFilterItem from 'hooks/useFilterItem';
import { Collection } from 'models/collection';
import { FilterWrapper } from '../ViewAll/Items/styled';
import SkeletonTopProfile from 'components/Skeletons/SkeletonTopProfile/SkeletonTopProfile';
import NoItem from 'customComponents/NoItem/NoItem';
import { selectUser } from 'redux/slices/userInfo';
import TabCollectionDetail from './TabCollectionDetail/TabCollectionDetail';
import MediaDisplayCard from '../MediaDisplayCardSmall/MediaDisplayCard';
import TwitterIcon from '../../../assets/icons/twitter-white.svg';
const CollectionDetail = () => {
	const desRef: any = useRef();
	const dispatch = useAppDispatch();
	const [show, setShow] = useState(false);
	const { collectionId } = useParams();
	let arr = [1, 2, 3, 4];
	const [offers, setOffers, loadingOffers] = useOutletContext<any>();
	const [collectionInfo, setCollectionInfo] = useState<Collection>();
	const [loadingCollectionImg, setLoadingCollectionImg] = useState(true);
	const triggerFetchNft = useAppSelector(selectTrigger);
	const userInfo = useAppSelector(selectUser);

	async function fetchCollectionItems() {
		let collection = await getItemOfCollection(collectionId!).then((res: any) => res.data);
		setCollectionInfo(collection);
		setLoadingCollectionImg(false);
	}
	useEffect(() => {
		fetchCollectionItems();
		return () => {
			dispatch(handleReset());
		};
	}, [triggerFetchNft]);

	return (
		<>
			<Box pt={13}>
				{loadingCollectionImg ? (
					<SkeletonTopProfile />
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
						{/* <img src={collectionInfo?.logo} alt="banner" /> */}
						<MediaDisplayCard
							media={collectionInfo?.logo}
							preview={TwitterIcon}
							name={collectionInfo?.collectionName}
						/>
						<Box
							sx={{
								position: 'absolute',
								left: '50%',
								transform: 'translate(-50%,-50%)',
								border: '4px solid #fff',
								borderRadius: '15px',
								height: '150px',
								width: '150px',
								img: {
									width: '100% !important',
									height: '100% !important',
									objectFit: 'cover',
									objectPosition: 'center',
									borderRadius: '10px',
								},
								video: {
									width: '100% !important',
									height: '100% !important',
									objectFit: 'cover !important',
									objectPosition: 'center',
									borderRadius: '10px',
								},
								'.react-player': {
									width: '100% !important',
									height: '100% !important',
								},
							}}
						>
							<MediaDisplayCard
								media={collectionInfo!.logo}
								preview={TwitterIcon}
								name={collectionInfo!.collectionName}
							/>
							{/* <img src={collectionInfo?.logo} alt="avatar" /> */}
						</Box>
					</Box>
				)}
				<Box pt={12} sx={{ maxWidth: '1440px', mx: 'auto' }}>
					<Box sx={{ width: '100%', textAlign: 'center' }}>
						<Typography variant="h4" fontWeight="500">
							{collectionInfo?.collectionName}
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
						<Box sx={{ maxWidth: '500px', mx: 'auto', mt: 2, px: 2 }}>
							{collectionInfo && (
								<DetailCollectionStatistic
									numberItems={collectionInfo?.listItem?.length}
									numberOwners={collectionInfo?.countOwner}
									floorPrice={collectionInfo?.minTradeItem[0]?.minTradeItem || 0}
									volumeTrades={collectionInfo?.volumeTrade}
								/>
							)}
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
							{collectionInfo?.description}
						</Typography>
					</Box>
					<Stack
						direction="row"
						alignItems="stretch"
						justifyContent="center"
						spacing={2}
						sx={{ mt: 4, mx: 'auto' }}
					>
						<TwitterShareButton
							url={`${RELATED_URLS.MetaSpacecyHomePage}/#/collection-detail/${collectionInfo?._id}`}
							title={`Look what I found! Collection ${collectionInfo?.collectionName}`}
							// hashtags={['Music', 'Game']}
							via="Metaspacecy"
							style={{ textAlign: 'left' }}
						>
							<FeatureWrapper sx={{ padding: '14px 15px', cursor: 'pointer' }}>
								<img src={Share} alt="icon share" style={{ height: '20px' }} />
							</FeatureWrapper>
						</TwitterShareButton>
						<FeatureWrapper
							sx={{ padding: '14px 14px', cursor: 'pointer' }}
							onClick={() => {
								window.location.reload();
							}}
						>
							<img
								src={IconReload}
								alt="icon heart"
								style={{ width: '20px', height: '20px' }}
							/>
						</FeatureWrapper>
					</Stack>
					<Box>
						<TabCollectionDetail collectionInfo={collectionInfo!} />
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default CollectionDetail;
