/* eslint-disable @typescript-eslint/no-unused-vars */
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import CardNFT from 'components/Marketplace/CardNFT';
import FilterItem from 'components/Marketplace/FilterItem';
import SkeletonCardNft from 'components/SkeletonCardNft';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getListItemResource } from 'utils/dataResource';

export default function Items() {
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const [loadingOffers, setLoadingOffers] = useState(true);
	const [offers, setOffers] = useState<any[]>([]);
	useEffect(() => {
		const fetchOffers = async () => {
			const newOffers = await getListItemResource();
			const tOffers = newOffers.slice(0, 12);
			setOffers(tOffers);
			setLoadingOffers(false);
		};
		fetchOffers();
	}, []);
	return (
		<>
			{/* <FilterItem /> */}
			<TabPanel value="1" sx={{ px: 0 }}>
				<Grid container maxWidth="1440px" mx="auto" spacing={1}>
					{loadingOffers ? (
						<>
							{arr.map((item, idx) => (
								<SkeletonCardNft key={item} />
							))}
						</>
					) : (
						<>
							{offers && (
								<>
									{offers?.map((offer: any, index: any) => (
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
