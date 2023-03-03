/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, CircularProgress, Grid, Stack, Typography, useTheme } from '@mui/material';
import ItemImage from './ItemImage';
import ListAllItem from './ListItemsSlider';
import ItemNameAndOwner from './ItemNameAndOwner';
import ExpandCard from 'customComponents/ExpandCard';
import DetailTab from './DetailTab';
import DescriptionTab from './DescriptionTab';
import CountDownAndPlaceBid from './CountDownAndPlaceBid';
import OfferTab from './Bider Tab';
import LoadingPage from 'customComponents/LoadingPage';
import { useParams } from 'react-router-dom';
import { SizeContext } from 'contexts/SizeObserver';
// import IconDescription from '/assets/icons/description-black.webp';
//IMG
import DescriptionBlack from 'assets/icons/description-black.webp';
import ItemWhite from 'assets/icons/icon-filter-collection-white.webp';
import ItemBlack from 'assets/icons/icon-filter-collection-black.webp';
// import TagWhite from 'assets/icons/tag-white.svg';
// import TagBlack from 'assets/icons/tag-black.svg';
import React, { useContext, useEffect, useState } from 'react';
import { ContainerAuctionDetail } from './styled';
import { getAuctionDetail } from '../../../../api/items/itemsApi';
import { orderSell } from 'models/transaction';
import { getBidAuction } from 'utils/auctionResources';

export default function AuctionDetail() {
	const [auctionDetail, setAuctionDetail] = useState<orderSell>();
	const [bidderInfo, setBiddderInfo] = useState<any>();
	const [isFinalize, setIsFinalize] = useState<boolean>(false);
	const { id } = useParams();
	const { innerWidth } = useContext(SizeContext);
	async function getAuctionDetailFunc() {
		let auctionDetail = await getAuctionDetail(id!);
		setAuctionDetail(auctionDetail);
		try {
			await getBidAuction(auctionDetail!.auctionId, auctionDetail.coinType, '2').then(
				(res) => {
					return setBiddderInfo(res);
				}
			);
		} catch (error) {
			setBiddderInfo({
				bids: { data: [] },
				offer_numbers: [],
				listing: { min_price: [auctionDetail.minPrice] },
			});
			setIsFinalize(true);
		}
	}
	useEffect(() => {
		if (!id) return;
		getAuctionDetailFunc();
	}, [id]);

	const renderAuctionDetail = () => {
		if (innerWidth > 1000) {
			return (
				<ContainerAuctionDetail>
					<Grid container mt={3} maxWidth={'99%'} mx={'auto'}>
						<Grid item xs={12} lg={6} px={5}>
							<Box>
								<ItemImage auctionDetail={auctionDetail!}></ItemImage>
							</Box>

							<Box sx={{ marginTop: '40px' }}>
								<ExpandCard
									title="Description"
									icon={DescriptionBlack}
									alt="description-expand"
								>
									<DescriptionTab auctionDetail={auctionDetail!}></DescriptionTab>
								</ExpandCard>
							</Box>
							{/* <Box sx={{ marginTop: '40px' }}>
								<ExpandCard
									title="Properties"
									icon={ DescriptionBlack : DescriptionWhite}
									alt="Properties-expand"
								>
									<PropertiesTab></PropertiesTab>
								</ExpandCard>
							</Box> */}
							<Box sx={{ marginTop: '40px' }}>
								<ExpandCard
									title="Details"
									icon={DescriptionBlack}
									alt="Detail-expand"
								>
									<DetailTab auctionDetail={auctionDetail!}></DetailTab>
								</ExpandCard>
							</Box>
						</Grid>
						<Grid item xs={12} lg={6}>
							<Box>
								<ItemNameAndOwner auctionDetail={auctionDetail!}></ItemNameAndOwner>
							</Box>
							<Box sx={{ marginTop: '8px' }}>
								<CountDownAndPlaceBid
									auctionDetail={auctionDetail!}
									bidderInfo={bidderInfo}
									isFinalize={isFinalize}
								></CountDownAndPlaceBid>
							</Box>

							<Box sx={{ marginTop: '40px' }}>
								<ExpandCard
									title="List of Bidder"
									icon={DescriptionBlack}
									alt="list-bider-expand"
								>
									<OfferTab
										bidderInfo={bidderInfo}
										auctionDetail={auctionDetail!}
									></OfferTab>
									{/* list of bidder */}
								</ExpandCard>
							</Box>
						</Grid>
					</Grid>
				</ContainerAuctionDetail>
			);
		} else {
			return (
				<ContainerAuctionDetail sx={{ padding: '0 16px' }}>
					<Box>
						<ItemImage auctionDetail={auctionDetail!}></ItemImage>
					</Box>
					<Box>
						<ItemNameAndOwner auctionDetail={auctionDetail!}></ItemNameAndOwner>
					</Box>
					<Box sx={{ marginTop: '20px' }}>
						<CountDownAndPlaceBid
							auctionDetail={auctionDetail!}
							bidderInfo={bidderInfo}
							isFinalize={isFinalize}
						></CountDownAndPlaceBid>
					</Box>
					<Box sx={{ marginTop: '20px' }}>
						<ExpandCard
							title="Description"
							icon={DescriptionBlack}
							alt="description-expand"
							initialExpandState={false}
						>
							<DescriptionTab auctionDetail={auctionDetail!}></DescriptionTab>
						</ExpandCard>
					</Box>
					<Box sx={{ marginTop: '20px' }}>
						<ListAllItem></ListAllItem>
					</Box>
					{/* <Box sx={{ marginTop: '20px' }}>
						<ExpandCard
							title="Properties"
							icon={ DescriptionBlack : DescriptionWhite}
							alt="Properties-expand"
							initialExpandState={false}
						>
							<PropertiesTab></PropertiesTab>
						</ExpandCard>
					</Box> */}
					<Box sx={{ marginTop: '20px' }}>
						<ExpandCard
							title="Details"
							icon={DescriptionBlack}
							alt="Detail-expand"
							initialExpandState={false}
						>
							<DetailTab auctionDetail={auctionDetail!}></DetailTab>
						</ExpandCard>
					</Box>
					<Box sx={{ marginTop: '20px' }}>
						<OfferTab bidderInfo={bidderInfo} auctionDetail={auctionDetail!}></OfferTab>
					</Box>
				</ContainerAuctionDetail>
			);
		}
	};

	return (
		<>
			{!auctionDetail ? (
				<Box mt={14}>
					<LoadingPage />{' '}
				</Box>
			) : (
				<Box pt={14}>{renderAuctionDetail()}</Box>
				// <h1>48y723</h1>
			)}
		</>
	);
}
