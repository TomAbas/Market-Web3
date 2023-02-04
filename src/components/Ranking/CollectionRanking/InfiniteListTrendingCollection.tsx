/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Grid, styled, Typography, useTheme, Skeleton } from '@mui/material';
//components
//models
import { CollectionTop as Collection } from 'models/collection';
//context
import { SizeContext } from 'contexts/SizeObserver';
//mui
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { CollectionName, FlexBox, TableScrollable, TableWrapper } from '../styled';
//redux
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH_COLLECTION } from 'routes/path';

// icon
import checkicon from 'assets/icons/icon-check.svg';

export interface InfiniteListTrendingCollectionProps {
	listCollection: Collection[];
	isLoading: boolean;
	hasNextPage: boolean;
	fetchNextPage: Function;
	allowLoadMore: boolean;
	selectedFilter: any;
}

export default function InfiniteListTrendingCollection({
	listCollection,
	isLoading,
	hasNextPage,
	fetchNextPage,
	allowLoadMore,
	selectedFilter,
}: InfiniteListTrendingCollectionProps) {
	const listRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const { innerWidth, innerHeight } = useContext(SizeContext);

	//state

	const renderPercent = (percent: number) => (
		<Typography
			sx={{
				color: percent > 0 ? 'green' : percent < 0 ? 'red' : 'inherit',
				whiteSpace: 'nowrap',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{percent > 0 ? '+' : percent < 0 ? '-' : null}
			{percent === 0 ? '___' : `${Math.abs(percent).toFixed(2)} %`}
		</Typography>
	);

	return (
		<Box sx={{ width: '100%' }} ref={listRef}>
			<TableWrapper>
				<TableScrollable>
					<thead>
						<tr>
							<th>
								<FlexBox>
									<Typography>Rank</Typography>
								</FlexBox>
							</th>
							<th>
								<FlexBox>
									<Typography>Collection</Typography>
								</FlexBox>
							</th>
							<th>
								<FlexBox>
									<Typography>Volume Trade</Typography>
								</FlexBox>
							</th>
							<th>
								<FlexBox>
									<Typography>24h %</Typography>
								</FlexBox>
							</th>
							<th>
								<FlexBox>
									<Typography>7d %</Typography>
								</FlexBox>
							</th>
							<th>
								<FlexBox>
									<Typography>30d %</Typography>
								</FlexBox>
							</th>

							<th>
								<FlexBox>
									<Typography>Floor Price</Typography>
								</FlexBox>
							</th>
							<th>
								<FlexBox>
									<Typography>Owners</Typography>
								</FlexBox>
							</th>
							<th>
								<FlexBox>
									<Typography>Items</Typography>
								</FlexBox>
							</th>
						</tr>
					</thead>
					{isLoading ? (
						<>
							<tbody>
								{new Array(10).fill(null).map((item: any, index: number) => (
									<tr key={index}>
										<th>
											<FlexBox sx={{ height: 40 }}>
												<Skeleton sx={{ width: '100%' }} />
											</FlexBox>
										</th>
										{new Array(8).fill(null).map((item: any, idx: number) => (
											<td key={idx}>
												<FlexBox>
													<Skeleton sx={{ width: '100%' }} />
												</FlexBox>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</>
					) : (
						<>
							<tbody>
								{listCollection.map((collection: any, index: number) => (
									<tr key={index}>
										<th>{index + 1}</th>
										<th>
											<FlexBox>
												<CollectionName
													onClick={() =>
														navigate(
															`/collection-detail/${collection._id}`
														)
													}
												>
													<Box sx={{ position: 'relative' }}>
														<Avatar
															variant="rounded"
															src={collection.logo}
															sx={{
																width: 40,
																height: 40,
																margin: '0 10px',
															}}
															alt="collection logo"
														/>
														<Box
															sx={{
																width: '20px',
																position: 'absolute',
																bottom: -10,
																right: 1,
															}}
														>
															{/* <img
																src={checkicon}
																alt="icon verified"
																style={{
																	width: '100%',
																	height: 'auto',
																}}
															/> */}
														</Box>
													</Box>

													<Typography fontWeight="500">
														{collection.collectionName}
													</Typography>
												</CollectionName>
											</FlexBox>
										</th>
										<td>
											<FlexBox>
												<Fragment>
													{collection[selectedFilter.value] / 10 ** 8} APT
												</Fragment>
											</FlexBox>
										</td>
										<td>
											<FlexBox>
												{renderPercent(collection.percent24Hour)}
											</FlexBox>
										</td>
										<td>
											<FlexBox>
												{renderPercent(collection.percent7Days)}
											</FlexBox>
										</td>
										<td>
											<FlexBox>
												{renderPercent(collection.percent30Days)}
											</FlexBox>
										</td>
										<td>
											<FlexBox sx={{ minWidth: '135px' }}>
												{collection.floorPrice / 10 ** 8} APT
											</FlexBox>
										</td>
										<td>
											<FlexBox>{collection.owners}</FlexBox>
										</td>
										<td>
											<FlexBox>{collection.items}</FlexBox>
										</td>
									</tr>
								))}
							</tbody>
						</>
					)}
				</TableScrollable>
			</TableWrapper>
		</Box>
	);
}
