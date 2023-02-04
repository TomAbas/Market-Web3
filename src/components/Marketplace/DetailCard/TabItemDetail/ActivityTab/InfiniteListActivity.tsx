import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { TabWrapper } from './styled';
import UserActivityCard from './UserActivityCard';
import { itemHistory, nftItem } from 'models/item';
import { getItemHistory } from 'api/items/itemsApi';
import { useParams } from 'react-router-dom';

interface Props {
	item: nftItem;
}
const InfiniteListActivity: React.FC<Props> = ({ item }) => {
	const [listItemHistory, setListItemHistory] = useState<itemHistory[]>([]);
	const { itemId } = useParams();
	async function getItemHistoryFc(itemId: string) {
		setListItemHistory(await getItemHistory(itemId).then((res: any) => res.data));
	}
	useEffect(() => {
		if (itemId) {
			getItemHistoryFc(itemId);
		}
	}, [itemId]);

	return (
		<Box sx={{ width: '100%' }}>
			<TabWrapper>
				{listItemHistory.map((itemHistory: itemHistory, index: number) => {
					return <UserActivityCard itemHistory={itemHistory} key={index} />;
				})}
				{/* {isLoading && <SkeletonNftActivityList />}

				{!isLoading && listTokenId && listTokenId.length === 0 && (
					<NoItemCircleCard title="No data yet!" image={ImageNoOffer} />
				)} */}
			</TabWrapper>
		</Box>
	);
};

export default InfiniteListActivity;
