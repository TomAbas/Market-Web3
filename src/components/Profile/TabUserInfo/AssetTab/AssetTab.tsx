import React from 'react';
import { Grid, Box, Tooltip } from '@mui/material';
import SkeletonCardNft from 'components/SkeletonCardNft';
import CardNFT from 'components/Marketplace/CardNFT';
import { nftItem } from 'models/item';
import useInteraction from 'hooks/useInteraction';
import FilterPrice from 'components/Marketplace/FilterItem/FilterPrice';
import FilterStatus from 'components/Marketplace/FilterItem/FilterStatus/FilterStatus';
import FilterCollection from 'components/Marketplace/FilterItem/FilterCollection/FilterCollection';
import { InputItem } from 'components/Mint/styled';
import AddIcon from '@mui/icons-material/Add';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';

interface Props {
	items: nftItem[];
	isLoading: boolean;
}
const AssetTab: React.FC<Props> = ({ items, isLoading }) => {
	const { likeItem, checkIsLike } = useInteraction();
	return (
		<>
			{' '}
			<Box sx={{ display: 'flex', width: 'auto', justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', width: 'auto', gap: '20px' }}>
					<FilterPrice />
					<FilterStatus />
					<FilterCollection />
				</Box>
				<Box sx={{ display: 'flex', width: 'auto', gap: '20px' }}>
					<InputItem sx={{ marginTop: '0' }}>
						<input
							type="text"
							placeholder="Search name ..."
							// {...register('name', { required: true })}
							// onChange={checkCollectionNameValid}
						/>
					</InputItem>
					<Tooltip title="Add Item" placement="top" arrow sx={{ marginLeft: 'auto' }}>
						<Box>
							<ButtonWhite
								sx={{
									py: '10px',
									minWidth: '46px',
									mb: 0,
									background: '#fff',
									border: '1px solid #E7E8EC',
									px: 0,
								}}
								// onClick={() => navigate(`${PATH_ITEM.createItem}`)}
							>
								<AddIcon />
							</ButtonWhite>
						</Box>
					</Tooltip>
				</Box>
			</Box>
			{/* <Box sx={{ display: 'flex', width: 'auto', gap: '20px' }}>
				<FilterPrice />
				<FilterStatus />
				<FilterCollection />

				<InputItem sx={{ marginTop: '0', float: 'right', height: '46px' }}>
					<input
						type="text"
						placeholder="Search name ..."
						{...register('name', { required: true })}
						onChange={checkCollectionNameValid}
					/>
					{errors.name && (
						<ErrorMessage>
							{errors.name.message ? errors.name.message : 'Name is required'}
						</ErrorMessage>
					)}
				</InputItem>
			</Box> */}
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
