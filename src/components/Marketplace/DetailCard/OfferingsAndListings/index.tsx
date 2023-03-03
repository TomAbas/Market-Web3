import React, { useState, useEffect } from 'react';
// styled
import { OrderList, OrderListWrapper, Wrapper } from './styled';
// components
import SkeletonOfferInItemDetailList from 'components/Skeletons/SkeletonOfferInItemDetailList';
import OrderInItemDetailCard from 'components/OrderInItemDetailCard';
// models

// mui
import { Box, Typography } from '@mui/material';
// redux
import { getOrderOfItem } from 'api/items/itemsApi';
import { orderSell } from 'models/transaction';
import { nftItem } from 'models/item';
import { User } from 'models/user';

interface Props {
	item: nftItem;
	userInfo: User;
}
export default function OfferingsAndLisings({ item, userInfo }: Props) {
	// useState

	const [listOrderSell, setListOrderSell] = useState<orderSell[]>([]);
	const [isLoad, setIsLoading] = useState(false);
	// useSelector

	async function getOrderOfItemFc() {
		// call api get order of item
		try {
			let arrayListOrder = await getOrderOfItem(item._id);
			// let result = await Promise.all(
			// 	arrayListOrder.map(async (order, idx) => {
			// 		if (order.maker === userInfo?.userAddress) return true;
			// 		let amountMaker = await getBalanceToken(
			// 			order.maker,
			// 			item.creator,
			// 			item.collectionInfo.collectionName,
			// 			item.itemName,
			// 			item.chainId
			// 		);
			// 		return amountMaker >= order.amount;
			// 	})
			// );
			// arrayListOrder = arrayListOrder.filter((order, index) => result[index]);
			setIsLoading(true);
			setListOrderSell(arrayListOrder);
		} catch (error) {}
	}
	useEffect(() => {}, [listOrderSell]);
	useEffect(() => {
		getOrderOfItemFc();
	}, [item._id, userInfo?.userAddress]);
	// functions

	return (
		<Wrapper sx={{ mt: 2, left: '0', right: '0', bottom: '0' }}>
			<OrderListWrapper>
				<>
					{isLoad ? (
						<OrderList>
							{listOrderSell && listOrderSell.length > 0 ? (
								listOrderSell.map((orderId: any, index: number) => (
									<Box sx={{ mb: 1 }} key={index}>
										<OrderInItemDetailCard
											orderId={orderId}
											isLoading={isLoad}
										/>
									</Box>
								))
							) : (
								<Box sx={{ mt: 2, p: 1 }}>
									<Typography variant="body1" sx={{ textAlign: 'center' }}>
										No listing yet!
									</Typography>
								</Box>
							)}
						</OrderList>
					) : (
						<SkeletonOfferInItemDetailList />
					)}
				</>
			</OrderListWrapper>
		</Wrapper>
	);
}
