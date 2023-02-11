/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
	Avatar,
	Box,
	Grid,
	styled,
	Typography,
	useTheme,
	Skeleton,
	Tooltip,
	TooltipProps,
	tooltipClasses,
} from '@mui/material';
// import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH_COLLECTION } from 'routes/path';
import {
	displayAddress,
	displayVolume,
	displayUserName,
	displayUserFullName,
} from 'utils/formatDisplay';
// icon
import checkicon from 'assets/icons/icon-check.svg';

export interface InfiniteListTrendingCollectionProps {
	listTopTrader: any[];
	isLoading: boolean;
	hasNextPage: boolean;
	fetchNextPage: Function;
	allowLoadMore: boolean;
}
export const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: 'none',
	},
});
export default function InfiniteListTopTrader({
	listTopTrader,
	isLoading,
	hasNextPage,
	fetchNextPage,
	allowLoadMore,
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
									<Typography sx={{ mr: 'auto', ml: 2 }}>Name</Typography>
								</FlexBox>
							</th>
							<th>
								<FlexBox>
									<Typography>Address</Typography>
								</FlexBox>
							</th>
							<th>
								<FlexBox>
									<Typography>Volume</Typography>
								</FlexBox>
							</th>
							<th>
								<FlexBox>
									<Typography>Percent Trade</Typography>
								</FlexBox>
							</th>
						</tr>
					</thead>
					{isLoading ? (
						<>
							<tbody>
								{new Array(10).fill(null).map((item: any, index: number) => (
									<tr key={index}>
										{new Array(5).fill(null).map((item: any, idx: number) => (
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
								{listTopTrader.map((item: any, index: number) => (
									<tr key={index}>
										<th>{index + 1}</th>
										<th>
											<FlexBox>
												<CollectionName
													onClick={() =>
														navigate(
															`/profile/?address=${item.user.userAddress}`
														)
													}
												>
													<Box sx={{ position: 'relative' }}>
														<Avatar
															variant="rounded"
															src={item?.user?.avatar}
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
														<NoMaxWidthTooltip
															title={displayUserFullName(
																item.user.username
															)}
														>
															<Typography fontWeight="500">
																{displayUserName(
																	item.user.username
																)}
															</Typography>
														</NoMaxWidthTooltip>
													</Typography>
												</CollectionName>
											</FlexBox>
										</th>

										<td>
											<FlexBox>
												{displayAddress(item.user.userAddress)}
											</FlexBox>
										</td>

										<td>
											<FlexBox>
												{displayVolume(item.volumeTrade / 10 ** 8, 2)}
											</FlexBox>
										</td>
										<td>
											<FlexBox>{renderPercent(item.percentTrade)}</FlexBox>
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
