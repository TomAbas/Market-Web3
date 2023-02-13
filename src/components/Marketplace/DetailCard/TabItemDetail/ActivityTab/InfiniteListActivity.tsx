import React from 'react';
import { Box } from '@mui/material';
import { TabWrapper } from './styled';
import UserActivityCard from './UserActivityCard';
import { itemHistory } from 'models/item';
import SkeletonNftActivityList from 'components/Skeletons/SkeletonNftActivityList/SkeletonNftActivityList';

interface Props {
	listItemHistory: itemHistory[];
	loading: boolean;
}
const InfiniteListActivity: React.FC<Props> = ({ listItemHistory, loading }) => {
	return (
		<Box sx={{ width: '100%' }}>
			<TabWrapper>
				{loading ? (
					<SkeletonNftActivityList />
				) : (
					<>
						{listItemHistory.map((itemHistory: itemHistory, index: number) => {
							return <UserActivityCard itemHistory={itemHistory} key={index} />;
						})}
					</>
				)}
			</TabWrapper>
		</Box>
	);
};

export default InfiniteListActivity;
