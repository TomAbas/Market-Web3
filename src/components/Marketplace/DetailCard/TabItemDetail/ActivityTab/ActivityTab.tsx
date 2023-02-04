import React from 'react';
import { TabWrapperContainer } from './styled';
import InfiniteListActivity from './InfiniteListActivity';
import { nftItem } from 'models/item';

interface Props {
	item: nftItem;
}
const ActivityTab: React.FC<Props> = ({ item }) => {
	return (
		<TabWrapperContainer>
			<InfiniteListActivity
				item={item!}
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
