/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import CardTopCollection from '../CardTopCollection/CardTopCollection';
import SkeletonCollectionRankingList from 'components/SkeletonCardTopCollections/SkeletonCardTopCollections';
import ErrorBoundary from 'components/SkeletonCardTopCollections/ErrorHandleComponents';
import { CollectionTop } from 'models/collection';
import { getTopCollections as getTopCollectionsAPI } from '../../../api/collections/collectionApi';
interface Props {
	filter: string;
}
const TopCollections: React.FC<Props> = ({ filter }) => {
	const [loadingState, setLoadingState] = useState({
		isSuccess: false,
		isError: false,
		isLoading: true,
	});
	const [list, setList] = useState<any>({ list24Hours: [], list7Days: [], list30Days: [] });
	async function getTopCollections() {
		let volume24Hours;
		let volume7Days;
		let volume30Days;
		try {
			await Promise.all([
				(volume24Hours = await getTopCollectionsAPI('2', '12', '1', 'volume24Hours')),
				(volume7Days = await getTopCollectionsAPI('2', '12', '1', 'volume7Days')),
				(volume30Days = await getTopCollectionsAPI('2', '12', '1', 'volume30Days')),
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
			console.log(error);
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
					filter={filter}
					listCollections={
						filter === '7 days'
							? list.list7Days
							: filter === '30 days'
							? list.list30Days
							: list.list24Hours
					}
				/>
			)}
		</>
	);
};

export default TopCollections;
