/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// components
import Modal from 'customComponents/Modal';
import SkeletonOfferInItemDetailList from 'components/Skeletons/SkeletonOfferInItemDetailList';
import { OrderList, OrderListWrapper } from './styled';
import { Box, Typography } from '@mui/material';
import OrderInItemDetailCard from 'components/OrderInItemDetailCard';
// images
import ImageNoOffer from 'assets/icons/Nodata.svg';
import { nftItem } from 'models/item';
import { getOrderOfItem } from 'api/items/itemsApi';

export interface IModalBuyProps {
	itemId: string;
	isOpenModal: boolean;
	setIsOpenModal: Function;
}

export default function ModalListOrder({ itemId, isOpenModal, setIsOpenModal }: IModalBuyProps) {
	const [listOrderSell, setListOrderSell] = useState<any>([]);
	const [isLoadingListOrderSell, setIsLoadingListOrderSell] = useState(false);
	async function getOrderOfItemFc() {
		// call api get order of item
		setListOrderSell(await getOrderOfItem(itemId));
		setIsLoadingListOrderSell(true);
	}
	useEffect(() => {
		console.log(listOrderSell);
	}, [listOrderSell]);
	useEffect(() => {
		getOrderOfItemFc();
	}, [itemId]);
	return (
		<Modal
			onOpen={isOpenModal}
			mainHeader={`Comfirm checkout`}
			style={{ maxWidth: '600px', overflowY: 'auto' }}
			allowClose={true}
			onClose={() => {
				setIsOpenModal(false);
			}}
		>
			<OrderListWrapper>
				{isLoadingListOrderSell ? (
					<OrderList>
						{listOrderSell.length > 0 ? (
							listOrderSell.map((orderId: any, index: number) => (
								<Box sx={{ mb: 1 }} key={index}>
									<OrderInItemDetailCard
										orderId={orderId}
										isLoading={isLoadingListOrderSell}
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
			</OrderListWrapper>
		</Modal>
	);
}
