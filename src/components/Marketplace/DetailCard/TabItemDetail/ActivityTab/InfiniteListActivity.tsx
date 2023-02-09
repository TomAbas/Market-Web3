import React from 'react';
import { Box } from '@mui/material';
import { TabWrapper } from './styled';
import UserActivityCard from './UserActivityCard';
import { itemHistory } from 'models/item';

interface Props {
	listItemHistory: itemHistory[];
}
const InfiniteListActivity: React.FC<Props> = ({ listItemHistory }) => {
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
