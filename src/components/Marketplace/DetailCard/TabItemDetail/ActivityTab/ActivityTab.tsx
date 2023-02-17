import React, { useEffect, useState } from 'react';
import { TabWrapperContainer } from './styled';
import InfiniteListActivity from './InfiniteListActivity';
import { itemHistory } from 'models/item';
// import { useParams } from 'react-router-dom';

interface Props {
	getHistory: any;
	currentHistoryType?: any;
	inputSearch?: string;
}
const ActivityTab: React.FC<Props> = ({ getHistory, currentHistoryType, inputSearch }) => {
	const [listItemHistory, setListItemHistory] = useState<itemHistory[]>([]);
	const [listHistoryDis, setListHistoryDis] = useState<itemHistory[]>([]);
	const [loading, setLoading] = useState(true);

	async function getItemHistoryFc() {
		// setListItemHistory(await getItemHistory(itemId).then((res: any) => res.data));
		setListItemHistory(await getHistory());
		setLoading(false);
		// filterHistoryByType();
	}
	function filterHistoryByType() {
		let arr: any = [];
		let result: any = listItemHistory;
		Object.keys(currentHistoryType).forEach((key) => {
			if (currentHistoryType[key].active) {
				console.log(currentHistoryType[key]);
				arr.push(currentHistoryType[key].type);
			}
		});
		console.log(arr);
		if (arr.length === 0) {
			console.log(listItemHistory);
			setListHistoryDis(result);
		} else {
			result = listItemHistory.filter((item) => arr.includes(item.type));
		}
		if (inputSearch) {
			result = result.filter(
				(item: any) =>
					item.from.toLowerCase().includes(inputSearch.toLowerCase()) ||
					(item?.itemInfo?.itemName?.toLowerCase().includes(inputSearch.toLowerCase()) ??
						false)
			);
		}
		setListHistoryDis(result);
	}
	useEffect(() => {
		getItemHistoryFc();
	}, [getHistory]);

	useEffect(() => {
		if (currentHistoryType) {
			filterHistoryByType();
		} else {
			setListHistoryDis(listItemHistory);
		}
	}, [currentHistoryType, listItemHistory, inputSearch]);
	return (
		<TabWrapperContainer>
			<InfiniteListActivity
				loading={loading}
				listItemHistory={listHistoryDis}
				// listTokenId={listItemActivity}
				// isLoading={isLoading}
				// hasNextPage={hasNextPage}
				// fetchNextPage={handleFetchNextPage}
				// allowLoadMore={true}
			/>
		</TabWrapperContainer>
	);
};

export default ActivityTab;
