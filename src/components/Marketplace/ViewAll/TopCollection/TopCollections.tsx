/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import CardTopCollection from '../../CardTopCollection/CardTopCollection';
import SkeletonCollectionRankingList from 'components/Skeletons/SkeletonCardTopCollections/SkeletonCardTopCollections';
import ErrorBoundary from 'components/Skeletons/SkeletonCardTopCollections/ErrorHandleComponents';
import { CollectionTop } from 'models/collection';
import { getTopCollections as getTopCollectionsAPI } from '../../../../api/collectionApi';
interface Props {
	filter: any;
}
const TopCollections: React.FC<Props> = ({ filter }) => {
	const [loadingState, setLoadingState] = useState({
		isSuccess: false,
		isError: false,
		isLoading: true,
	});
	const [list, setList] = useState<any>({ list24Hours: [], list7Days: [], list30Days: [] });

	let a: any[] = [1, 2, 3, 4, 5];

	async function getTopCollections() {
		let volume24Hours;
		let volume7Days;
		let volume30Days;
		try {
			await Promise.all([
				(volume24Hours = await getTopCollectionsAPI('2', '12', '1', 'volume24Hour')),
				(volume7Days = await getTopCollectionsAPI('2', '12', '1', 'volume7Days')),
				(volume30Days = await getTopCollectionsAPI('2', '12', '1', 'volume30Days').then(
					(res) => {
						return res;
					}
				)),
			]);
			setList({
				list24Hours: volume24Hours.data,
				list7Days: volume7Days.data,
				list30Days: volume30Days.data,
			});
			setLoadingState({
				isSuccess: true,
				isError: false,
				isLoading: false,
			});
		} catch (error) {
			setLoadingState({
				isSuccess: false,
				isError: true,
				isLoading: false,
			});
		}
	}
	useEffect(() => {
		getTopCollections();
	}, []);

	return (
		<>
			{loadingState.isLoading ? (
				<SkeletonCollectionRankingList />
			) : loadingState.isError ? (
				<ErrorBoundary
					title="Error!!!"
					content="Currently we couldn't load this content. Please refresh"
					callbackFn={() => {}}
				/>
			) : (
				<CardTopCollection
					filter={filter.name}
					listCollections={
						filter.name === '7 days'
							? list.list7Days
							: filter.name === '30 days'
							? list.list30Days
							: list.list24Hours
					}
				/>
			)}
		</>
	);
};

export default TopCollections;
