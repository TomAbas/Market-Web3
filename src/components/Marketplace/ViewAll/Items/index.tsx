/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import CardNFT from 'components/Marketplace/CardNFT';
import React, { useEffect, useState } from 'react';
import { getListItemResource } from 'utils/dataResource';

export default function Items() {
	const [offers, setOffers] = useState<any[]>([]);
	useEffect(() => {
		const fetchOffers = async () => {
			const newOffers = await getListItemResource();
			setOffers(newOffers);
		};
		fetchOffers();
	}, []);
	return (
		<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
			{offers.map((offer: any, index: any) => (
				<CardNFT
					offers={offers}
					offer={offer}
					setOffers={setOffers}
					index={index}
					key={index}
				/>
			))}
		</Grid>
	);
}
