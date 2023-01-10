/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import CardNFT from 'components/Marketplace/CardNFT';
import FilterItem from 'components/Marketplace/FilterItem';

export default function Items({ offers, setOffers }: { offers: any; setOffers: any }) {
	return (
		<>
			{/* <FilterItem /> */}
			<Grid container maxWidth="1440px" mx="auto" spacing={1}>
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
		</>
	);
}
