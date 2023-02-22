/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
// mui
import { Box, Stack, Typography } from '@mui/material';
// components
import SkeletonOrderInItemDetailCard from 'components/Skeletons/SkeletonOrderInItemDetailCard';
// styled
import { ButtonBox, OrderCard, StyledSpan, GradIcon } from './styled';
import { displayAddress } from 'utils/formatDisplay';
import { formatTimeHistory } from 'utils/function';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import useBuyItemAptos from 'utils/marketplace';
import { orderSell } from 'models/transaction';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/userInfo';

export interface IOrderInItemDetailCardProps {
	orderId: orderSell;
	isLoading: boolean;
}

export default function OrderInItemDetailCard({ orderId, isLoading }: IOrderInItemDetailCardProps) {
	const { buyItemAptos, statusWithdraw, handleWithdrawItem } = useBuyItemAptos(
		orderId.itemInfo,
		orderId
	);
	const userInfo = useAppSelector(selectUser);
	return isLoading ? (
		<OrderCard>
			<Stack
				direction="row"
				justifyContent="space-between"
				width="100%"
				alignItems="center
			"
			>
				<Stack direction="row" gap="10">
					<Box>
						<GradIcon
							sx={{
								background: `url(${orderId.itemInfo.itemMedia}) center center / cover no-repeat`,
								width: '40px',
								height: '40px',
								mr: 2,
								flexShrink: 0,
							}}
						/>
					</Box>
					<Typography variant="body2">
						<Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '4px' }}>
							{/* {formatNumber(currentOrderPrice, 0, 4)}{' '} */}
							{orderId.coinType?.split('::').slice(-1)[0].toUpperCase()}{' '}
							<StyledSpan>for</StyledSpan> {orderId.amount} item(s){' '}
							<StyledSpan>by</StyledSpan> {displayAddress(orderId.maker)}
						</Typography>
						<StyledSpan>{formatTimeHistory(orderId.createdAt).toString()}</StyledSpan>
						{/* March 29, 2022, 10:56 PM */}
					</Typography>
				</Stack>
				{userInfo?.userAddress && (
					<Box sx={{ flexShrink: 1, height: '82%' }}>
						{orderId.maker === userInfo?.userAddress ? (
							<ButtonWhite
								sx={{ padding: '5px 32px' }}
								onClick={() => {
									console.log('cancel now');
									handleWithdrawItem();
								}}
							>
								{statusWithdraw}
							</ButtonWhite>
						) : (
							<ButtonWhite
								sx={{ padding: '5px 32px' }}
								onClick={() => {
									console.log('buy now');
									buyItemAptos();
								}}
							>
								Buy Now
							</ButtonWhite>
						)}
					</Box>
				)}
			</Stack>

			{/* {orderType === 'offer' && (
					<ButtonBox className="ButtonDisplay">
						<ButtonAcceptOffer orderBuy={orderResponse} />
					</ButtonBox>
				)} */}

			{/* {orderType === 'sell' && (
					<ButtonBox className="ButtonDisplay">
						<ButtonBuy
							item={item}
							currentOrderPrice={currentOrderPrice}
							orderSell={orderResponse}
						/>
					</ButtonBox>
				)} */}
		</OrderCard>
	) : (
		<SkeletonOrderInItemDetailCard />
	);
}
