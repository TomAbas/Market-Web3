/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import CardNFT from 'components/Marketplace/CardNFT';

export default function Items({ offers, setOffers }: { offers: any; setOffers: any }) {
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
