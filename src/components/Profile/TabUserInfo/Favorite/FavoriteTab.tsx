import React from 'react';
import { Grid } from '@mui/material';
import SkeletonCardNft from 'components/Skeletons/SkeletonCardNft';
import CardNFT from 'components/Marketplace/CardNFT';
import { nftItem } from 'models/item';
import useInteraction from 'hooks/useInteraction';
interface Props {
	itemsF: nftItem[];
	isLoading: boolean;
}
const FavoriteTab: React.FC<Props> = ({ itemsF, isLoading }) => {
	const { likeItem, checkIsLike } = useInteraction();
	return (
		<>
			{' '}
			<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
				{isLoading ? (
					<>
						{new Array(4).fill(null).map((_, index) => (
							<SkeletonCardNft key={index} />
						))}
					</>
				) : (
					<>
						{itemsF.map((item: nftItem, index: any) => (
							<CardNFT
								itemLiked={checkIsLike}
								likeItem={likeItem}
								offers={[]}
								offer={item}
								index={index}
								key={index}
								loadingOffers={false}
							/>
						))}
					</>
				)}
			</Grid>
		</>
	);
};

export default FavoriteTab;
