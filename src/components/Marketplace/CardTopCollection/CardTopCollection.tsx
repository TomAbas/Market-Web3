// models
import { CollectionTop as Collection } from 'models/collection';

import Nodata from '../../../assets/icons/Nodata.svg';

import NoItem from 'components/CustomUI/NoItemCard/NoItemCard';
import CardTest from './CardTest';
import { Grid } from '@mui/material';

export interface ICollectionRankingCardProps {
	filter: string;
	listCollections: Collection[];
}

const CardTopCollection = ({ filter, listCollections }: ICollectionRankingCardProps) => {
	if (listCollections.length < 1 || !listCollections) {
		return <NoItem title="No Item Yet !" image={Nodata} />;
	}
	return (
		<>
			{listCollections.map((collection: Collection, idx) => (
				<Grid item xs={1} key={idx}>
					<CardTest idx={idx} collection={collection} filter={filter} />
				</Grid>
			))}
		</>
	);
};

export default CardTopCollection;
