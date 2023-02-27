/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import { Avatar, Box, Typography, Link } from '@mui/material';
// components

// styled
import { ResultItem } from './styled';
import SkeletonGlobalSearchResultCard from 'components/Skeletons/SkeletonGlobalSearchResultCard';
// hooks

interface SearchResult {
	image: string;
	info1: string;
	info2: string;
	src: string;
}

export interface IGlobalSearchResultCardProps {
	resultId: { name: string; userAddress: string; logo: string; id: string };
	type: 'collection' | 'item' | 'user';
	deactivateDropdown: Function;
	isLoading: boolean;
}

export default function GlobalSearchResultCard({
	resultId,
	type,
	deactivateDropdown,
	isLoading,
}: IGlobalSearchResultCardProps) {
	const navigate = useNavigate();
	// useEffect

	return !isLoading ? (
		<Link
			href={
				type === 'collection'
					? `#/collection-detail/${resultId.id}`
					: `#/item/${resultId.id}`
			}
			underline="none"
		>
			<ResultItem
				onClick={() => {
					deactivateDropdown();
					// navigate(searchResult.src);
				}}
			>
				<Avatar
					src={resultId.logo}
					alt="collection logo"
					sx={{ width: '40px', height: '40px' }}
				/>
				<Box>
					<Typography variant="body1">{resultId.name}</Typography>
					<Typography variant="body2" sx={{ opacity: 0.5 }}>
						{resultId.userAddress}
					</Typography>
				</Box>
			</ResultItem>
		</Link>
	) : (
		<SkeletonGlobalSearchResultCard />
	);
}
