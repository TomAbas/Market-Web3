/* eslint-disable @typescript-eslint/no-unused-vars */
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Box } from '@mui/material';
import CardNFT from 'components/Marketplace/CardNFT';
import FilterItem from './FilterItem';
import SkeletonCardNft from 'components/SkeletonCardNft';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getListItemResource } from 'utils/dataResource';
import { selectFilter } from 'redux/slices/nftFilter';
import { useAppSelector } from 'redux/hooks';
export default function Items() {
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const filterPar = useAppSelector(selectFilter);
	const [loadingOffers, setLoadingOffers] = useState(true);
	const [offers, setOffers] = useState<any[]>([]);
	const [offersDisplay, setOffersDisplay] = useState<any[]>([]);
	useEffect(() => {
		const fetchOffers = async () => {
			let newOffers = await getListItemResource();
			setOffers(newOffers);
			setLoadingOffers(false);
		};
		fetchOffers();
	}, []);
	useEffect(() => {
		if (offers.length > 0) {
			let newOffers = offers.filter((item: any) => {
				let price = Number(item.price) / 10 ** 8;

				if (filterPar.minPrice !== '' && filterPar.maxPrice !== '') {
					return (
						Number(filterPar.minPrice) <= price && Number(filterPar.maxPrice) >= price
					);
				} else if (filterPar.minPrice !== '') {
					return Number(filterPar.minPrice) <= price;
				} else if (filterPar.maxPrice !== '') {
					return Number(filterPar.maxPrice) >= price;
				}
				return true;
			});
			const tOffers = newOffers.slice(0, 12);
			setOffersDisplay(tOffers);
			// setOffers(tOffers);
		}
	}, [filterPar, loadingOffers]);
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
											offers={offers}
											offer={offer}
											setOffers={setOffers}
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
				{/* <>
					{arr.map((item, idx) => (
						<SkeletonCardNft key={item} />
					))}
				</> */}
			</TabPanel>
		</>
	);
}
