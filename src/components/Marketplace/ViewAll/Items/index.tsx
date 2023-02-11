/* eslint-disable @typescript-eslint/no-unused-vars */
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Box } from '@mui/material';
import CardNFT from 'components/Marketplace/CardNFT';
import FilterItem from './FilterItem';
import SkeletonCardNft from 'components/SkeletonCardNft';
import { useEffect, useState } from 'react';
import {
	handleReset,
	selectAllNfts,
	selectFilter,
	selectLoadingAllNfts,
} from 'redux/slices/nftFilter';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import useInteraction from 'hooks/useInteraction';
import { nftItem } from 'models/item';

export default function Items() {
	const dispatch = useAppDispatch();
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const { checkIsLike, likeItem } = useInteraction();
	const filterPar = useAppSelector(selectFilter);
	const offers = useAppSelector(selectAllNfts);
	const loadingOffers = useAppSelector(selectLoadingAllNfts);
	const [offersDisplay, setOffersDisplay] = useState<any[]>([]);
	const [viewFull, setViewFull] = useState(false);
	useEffect(() => {
		if (offers.length > 0) {
			let newOffers = offers.filter((item: any) => {
				let price = Number(item.price) / 10 ** 8;
				if (filterPar.minPrice !== '' && filterPar.maxPrice !== '') {
					return (
						Number(filterPar.minPrice) <= price &&
						Number(filterPar.maxPrice) >= price &&
						item.status === 1
					);
				} else if (filterPar.minPrice !== '') {
					return Number(filterPar.minPrice) <= price && item.status === 1;
				} else if (filterPar.maxPrice !== '') {
					return Number(filterPar.maxPrice) >= price && item.status === 1;
				}
				return true;
			});

			if (filterPar.status.length > 0) {
				if (filterPar.status.includes(1)) {
					newOffers = newOffers.filter((item: nftItem) => {
						return item.status === 1;
					});
				}
				if (filterPar.status.includes(0)) {
					newOffers.sort((a: any, b: any) => {
						return (
							Number(new Date(b.createdAt).getTime()) -
							Number(new Date(a.createdAt).getTime())
						);
					});
				}
			}
			if (filterPar.collectionId.length > 0) {
				newOffers = newOffers.filter((item: nftItem) => {
					return filterPar.collectionId.includes(item.collectionId);
				});
			}
			let newOffersDisplay = viewFull ? newOffers : newOffers.slice(0, 12);
			setOffersDisplay(newOffersDisplay);
		}
	}, [filterPar, loadingOffers, offers, viewFull]);
	return (
		<>
			{/* <FilterItem /> */}
			<TabPanel value="1" sx={{ px: 0 }}>
				<Box mb={1}>
					<FilterItem />
				</Box>
				<Grid container maxWidth="1440px" mx="auto" spacing={1}>
					{loadingOffers ? (
						<>
							{arr.map((item, idx) => (
								<SkeletonCardNft key={item} />
							))}
						</>
					) : (
						<>
							{offersDisplay && (
								<>
									{offersDisplay?.map((offer: any, index: any) => (
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
						</>
					)}
				</Grid>
				{!viewFull && offers.length > 12 && (
					<Box
						mx={'auto'}
						mt={2}
						width="fit-content"
						sx={{
							button: {
								padding: '10px 30px',
								border: '1.5px solid #e7e8ec',
								transition: 'all 0.4s',
								borderRadius: '12px',
								background: '#fff',
								fontSize: '16px',
								cursor: 'pointer',
								fontFamily: 'Montserrat, sans-serif !important',
								fontStyle: 'italic !important',
								width: 'auto',
								'&:hover': {
									background: '#007aff',
									borderColor: 'transparent',
									color: '#fff',
								},
							},
						}}
					>
						<button onClick={() => setViewFull(true)}>Load more</button>
					</Box>
				)}
				{/* <>
					{arr.map((item, idx) => (
						<SkeletonCardNft key={item} />
					))}
				</> */}
			</TabPanel>
		</>
	);
}
