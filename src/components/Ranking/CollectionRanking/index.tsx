/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Grid, styled, Typography, useTheme, Skeleton } from '@mui/material';
//components
//models
import { CollectionTop as Collection, Collection as CollectionModel } from 'models/collection';

import { CollectionName, FlexBox, TableScrollable, TableWrapper } from '../styled';
//redux
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH_COLLECTION } from 'routes/path';

// icon
import checkicon from 'assets/icons/icon-check.svg';
import { displayVolume, displayUserFullName, displayUserName } from 'utils/formatDisplay';
import { NoMaxWidthTooltip } from '../TopTrader';
import NoItem from 'customComponents/NoItem/NoItem';

export interface InfiniteListTrendingCollectionProps {
	listCollection: Collection[];
	isLoading: boolean;
	filter: any;
}

export default function InfiniteListTrendingCollection({
	listCollection,
	isLoading,
	filter,
}: InfiniteListTrendingCollectionProps) {
	const listRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
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
														></Box>
													</Box>

													<Typography fontWeight="500">
														<NoMaxWidthTooltip
															title={displayUserFullName(
																collection.collectionName
															)}
														>
															<Typography>
																{displayUserName(
																	collection.collectionName
																)}
															</Typography>
														</NoMaxWidthTooltip>
													</Typography>
												</CollectionName>
											</FlexBox>
										</th>
										<td>
											<FlexBox>
												<Fragment>
													{displayVolume(
														collection[filter.value] / 10 ** 8,
														2
													)}{' '}
													APT
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
												{displayVolume(collection.floorPrice / 10 ** 8, 2)}{' '}
												APT
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
