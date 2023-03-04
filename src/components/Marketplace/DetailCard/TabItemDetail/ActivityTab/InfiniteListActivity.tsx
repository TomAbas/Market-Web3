import React from 'react';
import { Box } from '@mui/material';
import { TabWrapper } from './styled';
import UserActivityCard from './UserActivityCard';
import UserActivityCardBid from '../../../../Profile/TabUserInfo/AuctionTab/UserActivityCard';
import { itemHistory } from 'models/item';
import SkeletonNftActivityList from 'components/Skeletons/SkeletonNftActivityList/SkeletonNftActivityList';
import NoItem from 'customComponents/NoItem/NoItem';

interface Props {
	listItemHistory: any;
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
						{listItemHistory.length > 0 ? (
							<>
								{listItemHistory.offer_price ? (
									<>
										{' '}
										{listItemHistory.map(
											(itemHistory: itemHistory, index: number) => {
												return (
													<UserActivityCardBid
														itemHistory={itemHistory}
														key={index}
													/>
												);
											}
										)}
									</>
								) : (
									<>
										{' '}
										{listItemHistory.map(
											(itemHistory: itemHistory, index: number) => {
												return (
													<UserActivityCard
														itemHistory={itemHistory}
														key={index}
													/>
												);
											}
										)}
									</>
								)}
							</>
						) : (
							<>
								<NoItem title="No data" />
							</>
						)}
					</>
				)}
			</TabWrapper>
		</Box>
	);
};

export default InfiniteListActivity;
