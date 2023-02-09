import { getUserHistory } from 'api/userApi';
import InfiniteListActivity from 'components/Marketplace/DetailCard/TabItemDetail/ActivityTab/InfiniteListActivity';
import { TabWrapperContainer } from 'components/Marketplace/DetailCard/TabItemDetail/ActivityTab/styled';
import { itemHistory } from 'models/item';
import React, { useEffect, useState } from 'react';

interface Props {
	infoUser: any;
}
const ActivityTab: React.FC<Props> = ({ infoUser }) => {
	const [listUserHistory, setListUserHistory] = useState<itemHistory[]>([]);

	async function getUserHistoryFc() {
		setListUserHistory(await getUserHistory(infoUser.userAddress).then((res: any) => res.data));
	}
	useEffect(() => {
		if (infoUser) {
			getUserHistoryFc();
		}
	}, [infoUser]);
	return (
		<TabWrapperContainer>
			<InfiniteListActivity
				listItemHistory={listUserHistory}
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
