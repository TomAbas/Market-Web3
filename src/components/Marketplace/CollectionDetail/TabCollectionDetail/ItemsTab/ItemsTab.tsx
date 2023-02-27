import { Tooltip, Box, Grid, Stack } from '@mui/material';
import FilterPrice from 'components/Marketplace/FilterItem/FilterPrice';
import FilterStatus from 'components/Marketplace/FilterItem/FilterStatus/FilterStatus';
import { FilterWrapper } from 'components/Marketplace/ViewAll/Items/styled';
import { InputItem } from 'components/Mint/styled';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Collection } from 'models/collection';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setFilter } from 'redux/slices/nftFilter';
import { selectUser } from 'redux/slices/userInfo';
import useInteraction from 'hooks/useInteraction';
import useFilterItem from 'hooks/useFilterItem';
import { useNavigate, useOutletContext } from 'react-router-dom';
import SkeletonCardNft from 'components/Skeletons/SkeletonCardNft';
import CardNFT from 'components/Marketplace/CardNFT';
import NoItem from 'customComponents/NoItem/NoItem';
interface Props {
	collectionInfo: Collection;
}
const ItemsTab: React.FC<Props> = ({ collectionInfo }) => {
	const [offers, , loadingOffers] = useOutletContext<any>();
	const navigate = useNavigate();
	const { checkIsLike, likeItem } = useInteraction();
	const { itemsDisplay } = useFilterItem(collectionInfo?.listItem || []);
	const userInfo = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const inputRef: any = useRef();
	function filterNameItem() {
		dispatch(setFilter({ itemName: inputRef.current.value.toLowerCase() }));
	}
	return (
		<>
			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={{ xs: 1, sm: 2, md: 4 }}
				justifyContent={{ xs: 'center', sm: 'space-between' }}
				px={{ xs: 1, sm: 2, md: 4 }}
			>
				<FilterWrapper>
					<FilterPrice />
					<FilterStatus />
				</FilterWrapper>
				<Box sx={{ display: 'flex', width: 'auto', gap: '20px' }}>
					<InputItem sx={{ marginTop: '0' }}>
						<input
							style={{ padding: '12px' }}
							type="text"
							placeholder="Search name ..."
							onChange={filterNameItem}
							ref={inputRef}
						/>
					</InputItem>
					{userInfo?.userAddress === collectionInfo?.userAddress && (
						<Tooltip
							title="Add Item"
							placement="top"
							arrow
							sx={{ marginLeft: 'auto' }}
							onClick={() => navigate(`/mint?query=2`)}
						>
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
								>
									<AddIcon />
								</ButtonWhite>
							</Box>
						</Tooltip>
					)}
				</Box>
			</Stack>
			<Box py={4}>
				<Grid container maxWidth="1440px" mx="auto" spacing={1}>
					{loadingOffers ? (
						<>
							{new Array(12).fill(null).map((item: any, idx: any) => (
								<SkeletonCardNft key={idx} />
							))}
						</>
					) : (
						<>
							{itemsDisplay.length > 0 ? (
								<>
									{itemsDisplay?.map((offer: any, index: any) => (
										<CardNFT
											itemLiked={checkIsLike}
											likeItem={likeItem}
											offers={offers}
											offer={offer}
											index={index}
											key={index}
											loadingOffers={loadingOffers}
										/>
									))}
								</>
							) : (
								<>
									<NoItem title="No Item"></NoItem>
								</>
							)}
						</>
					)}
				</Grid>
			</Box>
		</>
	);
};

export default ItemsTab;
