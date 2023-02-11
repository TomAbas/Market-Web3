/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import NoItem from 'components/CustomUI/NoItemCard/NoItemCard';
import CardCollection from 'components/Marketplace/CardCollection/CardCollection';
import CardNFT from 'components/Marketplace/CardNFT';
import useInteraction from 'hooks/useInteraction';
import { nftItem } from 'models/item';
import Nodata from '../../../../assets/icons/nodata.svg';
import React from 'react';

interface Props {
	collection: any;
	currentItemId: string | undefined;
}

const MoreItem: React.FC<Props> = ({ collection, currentItemId }) => {
	const { likeItem, checkIsLike } = useInteraction();
	let listFilterCurrentItem = collection.listItem.filter(
		(item: nftItem) => item._id !== currentItemId
	);
	let collectionDisplay =
		listFilterCurrentItem.length > 4
			? listFilterCurrentItem.slice(0, 4)
			: listFilterCurrentItem;
	return (
		<>
			{listFilterCurrentItem.length === 0 ? (
				<NoItem title="No items left!" image="" />
			) : (
				<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
					{collectionDisplay.map((item: nftItem) => {
						return (
							<CardNFT
								index={item._id}
								key={item._id}
								offer={item}
								itemLiked={checkIsLike}
								likeItem={likeItem}
								offers=""
								loadingOffers=""
							/>
						);
					})}
				</Grid>
			)}
			<NoItem title="No items left!" image={Nodata} />
		</>
	);
};

export default MoreItem;
