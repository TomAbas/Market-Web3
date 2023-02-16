/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import NoItem from '../../../../customComponents/NoItem/NoItem';
import CardNFT from 'components/Marketplace/CardNFT';
import useInteraction from 'hooks/useInteraction';
import { nftItem } from 'models/item';
import Nodata from '../../../../assets/icons/Nodata.svg';
import React from 'react';
import SkeletonCardNft from 'components/Skeletons/SkeletonCardNft';
import CustomSlider from 'customComponents/CustomSlider/CustomSlider';
interface Props {
	collection: any;
	currentItemId: string | undefined;
}

const MoreItem: React.FC<Props> = ({ collection, currentItemId }) => {
	const { likeItem, checkIsLike } = useInteraction();
	let listFilterCurrentItem = collection.listItem.filter(
		(item: nftItem) => item._id !== currentItemId
	);
	const renderListItem = () => {
		return collection.listItem
			.filter((item: nftItem) => item._id !== currentItemId)
			.map((item: nftItem) => {
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
			});
	};

	return (
		<>
			{listFilterCurrentItem.length === 0 ? (
				<NoItem title="No items left!" image={Nodata} />
			) : (
				<CustomSlider
					slidesPerView={4}
					loop={false}
					spaceBetween={2}
					slidesPerGroup={1}
					centeredSlides={false}
					slidesToShowPoint1358={4}
					slidesToShowPoint1093={3}
					slidesToShowPoint828={2}
					slidesToShowPoint547={1}
					slidesToShowPoint320={1}
					slidesToShowPoint0={1}
					renderItem={renderListItem()}
				/>
			)}
		</>
	);
};

export default MoreItem;
