/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
// styled
import { HistoryRow, StyledSpan } from './styled';
import { formatTimeHistory } from 'utils/function';
import TypeEvent from './TypeEvent';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/userInfo';
import { itemHistory } from 'models/item';

interface Props {
	itemHistory: itemHistory;
}
const UserActivityCard: React.FC<Props> = ({ itemHistory }) => {
	const userInfo = useAppSelector(selectUser);
	function openTXHonline() {
		console.log('123');
		if (Number(itemHistory.itemInfo.chainId) === 2) {
			window.open(`https://testnet.aptoscan.com/version/${itemHistory.txHash}`, '_blank');
		} else {
			window.open(`https://aptoscan.com/version/${itemHistory.txHash}`, '_blank');
		}
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

						<Box sx={{ ml: 2 }}>
							<Box>
								<TypeEvent
									itemHistory={itemHistory}
									userAddress={userInfo?.userAddress}
								/>
							</Box>

							<Typography variant="body2">
								<StyledSpan>{formatTimeHistory(itemHistory.createdAt)}</StyledSpan>
							</Typography>
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

export default UserActivityCard;
