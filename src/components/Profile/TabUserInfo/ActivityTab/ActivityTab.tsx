import { getUserHistory } from 'api/userApi';
import InfiniteListActivity from 'components/Marketplace/DetailCard/TabItemDetail/ActivityTab/InfiniteListActivity';
import { TabWrapperContainer } from 'components/Marketplace/DetailCard/TabItemDetail/ActivityTab/styled';
import { itemHistory } from 'models/item';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/userInfo';

const ActivityTab = () => {
	const userAddress = useAppSelector(selectUser)?.userAddress;
	const [listUserHistory, setListUserHistory] = useState<itemHistory[]>([]);

	async function getUserHistoryFc(userAddress: string) {
		setListUserHistory(await getUserHistory(userAddress).then((res: any) => res.data));
	}
	useEffect(() => {
		if (userAddress) {
			getUserHistoryFc(userAddress);
		}
	}, [userAddress]);
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
