/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Box, CircularProgress, Grid, Stack, Typography, useTheme } from '@mui/material';
// import ItemImage from 'components/pages/AuctionDetail/ItemImage';
// import ListAllItems from 'components/pages/AuctionDetail/ListItemsSlider';
// import ItemNameAndOwner from 'components/pages/AuctionDetail/ItemNameAndOwner';
// import React, { useContext, useEffect } from 'react';
// import { ContainerAuctionDetail } from './styled';
// import ExpandCard from 'components/pages/ItemDetail/ExpandCard';

// import PropertiesTab from 'components/pages/AuctionDetail/PropertiesTab';
// import DetailTab from 'components/pages/AuctionDetail/DetailTab';
// import DescriptionTab from 'components/pages/AuctionDetail/DescriptionTab';
// import CountDownAndPlaceBid from 'components/pages/AuctionDetail/CountDownAndPlaceBid';
// import OfferTab from 'components/pages/AuctionDetail/Bider Tab';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchAuctionDetailByAuctionId } from 'redux/actions/auctionDetailbyAuctionIdAction';
// import { RootState } from 'redux/store';
// import { toast } from 'react-toastify';
// import { SizeContext } from 'contexts/SizeObserver';
// //IMG
// import DescriptionBlack from 'assets/icons/description-black.webp';
// import DescriptionWhite from 'assets/icons/description-white.webp';
// import ItemWhite from 'assets/icons/filter-collection-white.webp';
// import ItemBlack from 'assets/icons/filter-collection-black.webp';

// import TagWhite from 'assets/icons/tag-white.svg';
// import TagBlack from 'assets/icons/tag-black.svg';
// import { selectAuctionDetail, selectLoading } from 'redux/slices/auctionDetailByAuctionIdSlice';
// import LoadingPage from 'components/CustomUI/LoadingPage';

export interface IAppProps {}

export default function AuctionDetail() {
	// const { auctionId } = useParams();
	// const dispatch = useDispatch();

	// const theme = useTheme();
	// const isLightTheme = theme.palette.mode === 'light';
	// // SELECTOR
	// const { innerWidth } = useContext(SizeContext);
	// const auctionDetail = useSelector(selectAuctionDetail);
	// // useEffect
	// useEffect(() => {
	// 	window.scrollTo({ top: 0, behavior: 'smooth' });
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// useEffect(() => {
	// 	dispatch(fetchAuctionDetailByAuctionId(auctionId, executeAfterFetchAuctionDetail));
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	// const executeAfterFetchAuctionDetail = async (globalStateNewest: RootState) => {
	// 	// const { auctionDetail } = globalStateNewest;

	// 	if (!auctionDetail.isSuccess) {
	// 		toast.error(auctionDetail.errorMessage, {
	// 			autoClose: 2500,
	// 		});
	// 	}
	// };
	// const renderAuctionDetail = () => {
	// 	if (innerWidth > 1000) {
	// 		return (
	// 			<ContainerAuctionDetail>
	// 				<Grid container spacing={10} mt={3}>
	// 					<Grid item xs={12} lg={6}>
	// 						<Box>
	// 							<ItemImage></ItemImage>
	// 						</Box>

	// 						<Box sx={{ marginTop: '40px' }}>
	// 							<ExpandCard
	// 								title="Description"
	// 								icon={isLightTheme ? DescriptionBlack : DescriptionWhite}
	// 								alt="description-expand"
	// 							>
	// 								<DescriptionTab></DescriptionTab>
	// 							</ExpandCard>
	// 						</Box>
	// 						{/* <Box sx={{ marginTop: '40px' }}>
	// 							<ExpandCard
	// 								title="Properties"
	// 								icon={isLightTheme ? DescriptionBlack : DescriptionWhite}
	// 								alt="Properties-expand"
	// 							>
	// 								<PropertiesTab></PropertiesTab>
	// 							</ExpandCard>
	// 						</Box> */}
	// 						<Box sx={{ marginTop: '40px' }}>
	// 							<ExpandCard
	// 								title="Detail"
	// 								icon={isLightTheme ? TagBlack : TagWhite}
	// 								alt="Detail-expand"
	// 							>
	// 								<DetailTab></DetailTab>
	// 							</ExpandCard>
	// 						</Box>
	// 					</Grid>
	// 					<Grid item xs={12} lg={6}>
	// 						<Box>
	// 							<ItemNameAndOwner></ItemNameAndOwner>
	// 						</Box>
	// 						<Box sx={{ marginTop: '8px' }}>
	// 							<CountDownAndPlaceBid></CountDownAndPlaceBid>
	// 						</Box>
	// 						<Box sx={{ marginTop: '40px' }}>
	// 							<ExpandCard
	// 								title="Items"
	// 								icon={isLightTheme ? ItemBlack : ItemWhite}
	// 								alt="items-expand"
	// 							>
	// 								<ListAllItems></ListAllItems>
	// 							</ExpandCard>
	// 						</Box>
	// 						<Box sx={{ marginTop: '40px' }}>
	// 							<ExpandCard
	// 								title="List of Bidder"
	// 								icon={isLightTheme ? TagBlack : TagWhite}
	// 								alt="list-bider-expand"
	// 							>
	// 								<OfferTab></OfferTab>
	// 							</ExpandCard>
	// 						</Box>
	// 					</Grid>
	// 				</Grid>
	// 			</ContainerAuctionDetail>
	// 		);
	// 	} else {
	// 		return (
	// 			<ContainerAuctionDetail sx={{ padding: '0 16px' }}>
	// 				<Box>
	// 					<ItemImage></ItemImage>
	// 				</Box>
	// 				<Box>
	// 					<ItemNameAndOwner></ItemNameAndOwner>
	// 				</Box>
	// 				<Box sx={{ marginTop: '40px' }}>
	// 					<CountDownAndPlaceBid></CountDownAndPlaceBid>
	// 				</Box>
	// 				<Box sx={{ marginTop: '40px' }}>
	// 					<ExpandCard
	// 						title="Description"
	// 						icon={isLightTheme ? DescriptionBlack : DescriptionWhite}
	// 						alt="description-expand"
	// 						initialExpandState={false}
	// 					>
	// 						<DescriptionTab></DescriptionTab>
	// 					</ExpandCard>
	// 				</Box>
	// 				<Box sx={{ marginTop: '40px' }}>
	// 					<ListAllItems></ListAllItems>
	// 				</Box>
	// 				{/* <Box sx={{ marginTop: '40px' }}>
	// 					<ExpandCard
	// 						title="Properties"
	// 						icon={isLightTheme ? DescriptionBlack : DescriptionWhite}
	// 						alt="Properties-expand"
	// 						initialExpandState={false}
	// 					>
	// 						<PropertiesTab></PropertiesTab>
	// 					</ExpandCard>
	// 				</Box> */}
	// 				<Box sx={{ marginTop: '40px' }}>
	// 					<ExpandCard
	// 						title="Detail"
	// 						icon={isLightTheme ? DescriptionBlack : DescriptionWhite}
	// 						alt="Detail-expand"
	// 						initialExpandState={false}
	// 					>
	// 						<DetailTab></DetailTab>
	// 					</ExpandCard>
	// 				</Box>
	// 				<Box sx={{ marginTop: '40px' }}>
	// 					<OfferTab></OfferTab>
	// 				</Box>
	// 			</ContainerAuctionDetail>
	// 		);
	// 	}
	// };

	return (
		<>
			{/* {auctionDetail === null ? (
				<Box mt={14}>
					<LoadingPage />{' '}
				</Box>
			) : (
				<Box mt={14}>{renderAuctionDetail()}</Box>
			)} */}
		</>
	);
}
