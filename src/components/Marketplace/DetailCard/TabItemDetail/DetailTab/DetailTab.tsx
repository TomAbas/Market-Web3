import React from 'react';
import { TabWrapper, DetailTitle } from './styled';
import { Skeleton, Stack, Typography } from '@mui/material';
import { nftItem } from 'models/item';
import { NETWORKINFO } from 'constants/etherscan.constant';
import { displayAddress } from 'utils/formatDisplay';
interface Props {
	userAmountOfItem: string;
	item: nftItem;
}
const DetailTab: React.FC<Props> = ({ userAmountOfItem, item }) => {
	return (
		<>
			{item && userAmountOfItem ? (
				<TabWrapper>
					<Stack direction="row" spacing={2}>
						{/* Title */}
						<DetailTitle spacing={1}>
							<Typography variant="body1">Blockchain:</Typography>
							<Typography variant="body1">Owned Quantity:</Typography>
							<Typography variant="body1">Royalty Fee:</Typography>
							<Typography variant="body1">Royalty Payee:</Typography>
							<Typography variant="body1">Description:</Typography>
							{/* <Typography variant="body1">Supply:</Typography> */}
						</DetailTitle>

						{/* Value */}
						<Stack spacing={1} sx={{ minWidth: 0 }}>
							<Typography variant="body1">
								{NETWORKINFO[item?.chainId]?.name} Chain
							</Typography>
							<Typography variant="body1">{userAmountOfItem}</Typography>
							<Typography variant="body1">{item?.royalties / 100}%</Typography>
							<Typography variant="body1">{displayAddress(item?.creator)}</Typography>
							<Typography variant="body1">{item?.description}</Typography>
						</Stack>
					</Stack>
				</TabWrapper>
			) : (
				<Stack gap="16px" sx={{ width: '50%' }}>
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				</Stack>
			)}
		</>
	);
};

export default DetailTab;
