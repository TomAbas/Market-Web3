import React from 'react';
// mui
import { Box, Skeleton, Stack } from '@mui/material';

export interface ISkeletonOrderInItemDetailCardProps {}

export default function SkeletonOrderInItemDetailCard(props: ISkeletonOrderInItemDetailCardProps) {
	return (
		<Stack
			direction="row"
			alignItems="center"
			spacing={1}
			sx={{
				p: 1,
				borderBottom: '1px solid grey',
			}}
		>
			<Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
			<Box>
				<Skeleton sx={{ width: '250px' }} />
				<Skeleton sx={{ width: '150px' }} />
			</Box>
		</Stack>
	);
}
