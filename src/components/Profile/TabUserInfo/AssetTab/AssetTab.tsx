import React, { useRef, useState } from 'react';
import { Grid, Box, Tooltip } from '@mui/material';
import SkeletonCardNft from 'components/Skeletons/SkeletonCardNft';
import CardNFT from 'components/Marketplace/CardNFT';
import { nftItem } from 'models/item';
import useInteraction from 'hooks/useInteraction';
import FilterPrice from 'components/Marketplace/FilterItem/FilterPrice';
import FilterStatus from 'components/Marketplace/FilterItem/FilterStatus/FilterStatus';
import FilterCollection from 'components/Marketplace/FilterItem/FilterCollection/FilterCollection';
import { InputItem } from 'components/Mint/styled';
import AddIcon from '@mui/icons-material/Add';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setFilter } from 'redux/slices/nftFilter';
import FilterRoyal from 'components/Marketplace/FilterItem/FilterRoyal/FilterRoyal';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
	DropdownContentStyled,
	FilterBox,
	FilterStack,
	FilterWrapper,
} from 'components/Marketplace/ViewAll/Items/styled';
import NoItem from 'customComponents/NoItem/NoItem';
import { selectListNftOrders } from 'redux/slices/orderResource';
import DropDown from 'components/CustomUI/DropDown';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
interface Props {
	items: nftItem[];
	isLoading: boolean;
}
const AssetTab: React.FC<Props> = ({ items, isLoading }) => {
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [searchParams] = useSearchParams();
	const address = searchParams.get('address');
	const dispatch = useAppDispatch();
	const { likeItem, checkIsLike } = useInteraction();
	const navigate = useNavigate();
	const inputRef: any = useRef();
	const listNftOrders = useAppSelector(selectListNftOrders);
	function filterNameItem() {
		dispatch(setFilter({ itemName: inputRef.current.value.toLowerCase() }));
	}
	const renderButtonContent = () => {
		return (
			<FilterBox>
				<FilterAltOutlinedIcon sx={{ width: '22px', height: '22px' }} />
			</FilterBox>
		);
	};
	const renderDropdownContent = () => {
		return (
			<DropdownContentStyled>
				<FilterStack>
					<FilterPrice />
					<FilterStatus />
					<FilterCollection />
					<FilterRoyal />
				</FilterStack>
			</DropdownContentStyled>
		);
	};
	return (
		<>
			{' '}
			<Box
				sx={{
					display: 'flex',
					width: 'auto',
					justifyContent: 'space-between',
					padding: '0px 8px',
				}}
			>
				<FilterWrapper>
					<Box className="big-screen">
						<FilterPrice />
						<FilterStatus />
						<FilterCollection />
						<FilterRoyal />
					</Box>
					<DropDown
						sx={{
							position: 'absolute',
							display: 'none',
							left: 0,
							top: '60%',
							zIndex: 11,
							'&.active': {
								display: 'block',
							},
						}}
						activeDropDown={activeDropDown}
						setActiveDropDown={setActiveDropDown}
						buttonContent={renderButtonContent()}
						dropdownContent={renderDropdownContent()}
						className="small-screen"
					/>
				</FilterWrapper>
				<Box sx={{ display: 'flex', width: 'auto', gap: '20px' }}>
					<InputItem
						sx={{ marginTop: '0', width: '50vw', maxWidth: '500px', minWidth: '223px' }}
					>
						<input
							type="text"
							placeholder="Search name ..."
							onChange={filterNameItem}
							ref={inputRef}
						/>
					</InputItem>
					{!address && (
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
									// onClick={() => navigate(`${PATH_ITEM.createItem}`)}
								>
									<AddIcon />
								</ButtonWhite>
							</Box>
						</Tooltip>
					)}
				</Box>
			</Box>
			<Grid container maxWidth="1440px" mx="auto" spacing={1} mt={3}>
				{isLoading ? (
					<>
						{new Array(4).fill(null).map((_, index) => (
							<SkeletonCardNft key={index} />
						))}
					</>
				) : (
					<>
						{items.length > 0 ? (
							items.map((item: nftItem, index: any) => (
								<CardNFT
									itemLiked={checkIsLike}
									likeItem={likeItem}
									offers={[]}
									offer={item}
									index={index}
									key={index}
									loadingOffers={false}
									listNftOrders={listNftOrders}
									isProfile={address ? false : true}
								/>
							))
						) : (
							<NoItem title="No items left!" />
						)}
					</>
				)}
			</Grid>
		</>
	);
};

export default AssetTab;
