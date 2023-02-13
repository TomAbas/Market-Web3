import React, { useEffect, useState } from 'react';
import { TabWrapperContainer } from './styled';
import InfiniteListActivity from './InfiniteListActivity';
import { itemHistory } from 'models/item';
import { getItemHistory } from 'api/items/itemsApi';
import { useParams } from 'react-router-dom';

const ActivityTab: React.FC = () => {
	const [listItemHistory, setListItemHistory] = useState<itemHistory[]>([]);
	const [loading, setLoading] = useState(true);
	const { itemId } = useParams();
	async function getItemHistoryFc(itemId: string) {
		setListItemHistory(await getItemHistory(itemId).then((res: any) => res.data));
		setLoading(false);
	}
	useEffect(() => {
		if (itemId) {
			getItemHistoryFc(itemId);
		}
	}, [itemId]);
	return (
		<TabWrapperContainer>
			<InfiniteListActivity
				loading={loading}
				listItemHistory={listItemHistory}
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
