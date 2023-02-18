/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
// mui
import { Box, Typography } from '@mui/material';
// styled
import { Divider } from './Common/styled';
import { ResultTitle, GlobalSearchComponent, ButtonAllResults } from './styled';
// components

// apis
// contexts

// utils
import GlobalSearchSmallScreen from './GlobalSearchSmallScreen';
import GlobalSearchBigScreen from './GlobalSearchBigScreen';
import SkeletonGlobalResultList from 'components/Skeletons/SkeletonGlobalResultList';
import GlobalSearchResultCard from '../GlobalSearchResultCard';
import { useDebounce } from 'hooks/useDebounce';
import { useAppSelector } from 'redux/hooks';
import { selectAllCollections, selectAllNfts } from 'redux/slices/nftFilter';
import { Collection } from 'models/collection';
import { nftItem } from 'models/item';
import { displayUserName } from 'utils/formatDisplay';
// hooks

const GlobalSearch: React.FC = () => {
	// useState
	const [inputValue, setInputValue] = useState<string>('');
	const [isLoadingCollection, setIsLoadingCollection] = useState<boolean>(false);
	const [isLoadingItem, setIsLoadingItem] = useState<boolean>(false);
	const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
	const [listCollectionId, setListCollectionId] = useState<any>([]);
	const [listItemId, setListItemId] = useState<any>([]);
	const allColectionArr = useAppSelector(selectAllCollections);
	const allItemArr = useAppSelector(selectAllNfts);
	const [isLoading, setIsLoading] = useState(true);
	// hooks
	const debouncedInputValue = useDebounce<string>(inputValue, 500);

	// vars
	const globalSearchBreakpoint = 600;

	// functions
	const handleOnChangeInputValue = (e: any) => {
		const newValue = e.target.value;
		setInputValue(newValue);
	};
	useEffect(() => {
		if (inputValue.length > 0) {
			setIsLoading(true);
			let arrSearchCollection = allColectionArr
				.filter((item: Collection) => {
					return item.collectionName.toLowerCase().includes(inputValue.toLowerCase());
				})
				.map((item: Collection) => {
					return {
						name: displayUserName(item.collectionName),
						logo: item.logo,
						userAddress: displayUserName(item.userAddress),
					};
				})
				.slice(0, 2);
			let arrSearchItem = allItemArr
				.filter((item: nftItem) => {
					return item.itemName.toLowerCase().includes(inputValue.toLowerCase());
				})
				.map((item: nftItem) => {
					return {
						name: displayUserName(item.itemName),
						logo: item.itemMedia,
						userAddress: displayUserName(item.creator),
					};
				})
				.slice(0, 2);
			setListCollectionId(arrSearchCollection);
			setListItemId(arrSearchItem);
			setIsLoading(false);
		} else {
			setListCollectionId([]);
			setListItemId([]);
		}
	}, [inputValue]);

	const RenderSearchResults = (deactivateDropdown: Function) => {
		return (
			<Box>
				<ResultTitle variant="body1">Collection</ResultTitle>

				{!isLoading ? (
					listCollectionId.length > 0 ? (
						<>
							{listCollectionId.map((item: any, index: number) => {
								return (
									<Box key={index}>
										<Divider />
										<GlobalSearchResultCard
											isLoading={isLoading}
											resultId={item}
											type="collection"
											deactivateDropdown={deactivateDropdown}
										/>
									</Box>
								);
							})}
						</>
					) : (
						<Typography variant="body2" sx={{ pl: 1, pb: 1 }}>
							No result
						</Typography>
					)
				) : (
					<SkeletonGlobalResultList />
				)}

				<Divider />
				<ResultTitle variant="body1">Item</ResultTitle>
				{!isLoading ? (
					listItemId.length > 0 ? (
						<>
							{listItemId.map((item: any, index: number) => {
								return (
									<Box key={index}>
										<Divider />
										<GlobalSearchResultCard
											isLoading={isLoading}
											resultId={item}
											type="item"
											deactivateDropdown={deactivateDropdown}
										/>
									</Box>
								);
							})}
						</>
					) : (
						<Typography variant="body2" sx={{ pl: 1, pb: 1 }}>
							No result
						</Typography>
					)
				) : (
					<SkeletonGlobalResultList />
				)}

				<Divider />
			</Box>
		);
	};

	return (
		<GlobalSearchComponent>
			{/* {innerWidth <= globalSearchBreakpoint && (
				<GlobalSearchSmallScreen
					inputValue={inputValue}
					handleOnChangeInputValue={handleOnChangeInputValue}
					RenderSearchResults={RenderSearchResults}
				/>
			)} */}

			{/* {innerWidth > globalSearchBreakpoint && (
				<GlobalSearchBigScreen
					inputValue={inputValue}
					setInputValue={setInputValue}
					handleOnChangeInputValue={handleOnChangeInputValue}
					RenderSearchResults={RenderSearchResults}
				/>
			)} */}
			<GlobalSearchBigScreen
				inputValue={inputValue}
				setInputValue={setInputValue}
				handleOnChangeInputValue={handleOnChangeInputValue}
				RenderSearchResults={RenderSearchResults}
			/>
		</GlobalSearchComponent>
	);
};

export default React.memo(GlobalSearch);
