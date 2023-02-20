import React from 'react';
// components

// mui
import { Box } from '@mui/material';
import { Divider } from 'components/Header/SearchBar/GlobalSearch/Common/styled';
import SkeletonGlobalSearchResultCard from '../SkeletonGlobalSearchResultCard';
// styled

type SkeletonGlobalResultListProps = {
	amount?: number;
};

export default function SkeletonGlobalResultList({ amount }: SkeletonGlobalResultListProps) {
	return (
		<>
			{new Array(amount ? amount : 3).fill(null).map((item, idx) => {
				return (
					<Box key={idx}>
						<Divider />
						<SkeletonGlobalSearchResultCard />
					</Box>
				);
			})}
		</>
	);
}
