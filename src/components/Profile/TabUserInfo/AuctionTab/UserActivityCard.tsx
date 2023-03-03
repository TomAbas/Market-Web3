/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
// styled
import { HistoryRow, StyledSpan } from './styled';
import { formatTimeHistory } from 'utils/function';
import TypeEvent from '../../../Marketplace/DetailCard/TabItemDetail/ActivityTab/TypeEvent';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/userInfo';
import { itemHistory } from 'models/item';
import { useNavigate } from 'react-router-dom';

interface Props {
	itemHistory: any;
}
const UserActivityCardBid: React.FC<Props> = ({ itemHistory }) => {
	const userInfo = useAppSelector(selectUser);
	const navigate = useNavigate();
	function openTXHonline() {
		navigate(`/auction/${itemHistory.auctionInfo?._id}`);
	}
	return (
		<>
			<HistoryRow>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Stack direction="row" alignItems="center">
						<Avatar
							src={itemHistory.fromUserInfo.avatar}
							variant="rounded"
							sx={{ width: '40px', height: '40px' }}
						/>

						<Box sx={{ ml: 2, textAlign: 'unset' }}>
							<Box>
								<TypeEvent
									itemHistory={itemHistory}
									userAddress={userInfo?.userAddress}
								/>
							</Box>

							{/* <Typography variant="body2">
								<StyledSpan>{formatTimeHistory(itemHistory.createdAt)}</StyledSpan>
							</Typography> */}
						</Box>
					</Stack>

					<Box onClick={openTXHonline}>
						<LaunchIcon sx={{ width: '20px', cursor: 'pointer' }} />
					</Box>
				</Stack>
			</HistoryRow>
		</>
	);
};

export default UserActivityCardBid;
