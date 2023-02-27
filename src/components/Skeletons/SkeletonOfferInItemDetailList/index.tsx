import React from 'react';

// mui
import { Box, Stack, Skeleton } from '@mui/material';

type SkeletonOfferInItemDetailListProps = {
	amount?: number;
};

export default function SkeletonOfferInItemDetailList({
	amount,
}: SkeletonOfferInItemDetailListProps) {
	return (
		<>
			{new Array(amount ? amount : 3).fill(null).map((item, idx) => {
				return (
					<Box key={idx} sx={{ mb: 1 }}>
						<Stack
							direction="row"
							alignItems="center"
							spacing={1}
							sx={{
								p: 1,
								borderBottom: '1px solid grey',
							}}
						>
							<Skeleton
								variant="circular"
								width={40}
								height={40}
								sx={{ flexShrink: 0 }}
							/>
							<Box>
								<Skeleton sx={{ width: '250px' }} />
								<Skeleton sx={{ width: '150px' }} />
							</Box>
						</Stack>
					</Box>
				);
			})}
		</>
	);
}
