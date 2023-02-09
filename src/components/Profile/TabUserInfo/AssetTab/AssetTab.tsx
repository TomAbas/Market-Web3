import React from 'react';
import { Grid } from '@mui/material';
import SkeletonCardNft from 'components/SkeletonCardNft';
import CardNFT from 'components/Marketplace/CardNFT';
import { nftItem } from 'models/item';
import useInteraction from 'hooks/useInteraction';
interface Props {
	items: nftItem[];
	isLoading: boolean;
}
const AssetTab: React.FC<Props> = ({ items, isLoading }) => {
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
						{items.map((item: nftItem, index: any) => (
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

export default AssetTab;
