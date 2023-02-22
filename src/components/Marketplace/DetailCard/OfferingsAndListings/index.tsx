/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
// styled
import { OptionItem, OrderList, OrderListWrapper, Wrapper } from './styled';
// components
import SelectCustom from 'customComponents/SelectCustom';
import SkeletonOfferInItemDetailList from 'components/Skeletons/SkeletonOfferInItemDetailList';
import OrderInItemDetailCard from 'components/OrderInItemDetailCard';
// models

// mui
import { Box, Stack, Typography, useTheme } from '@mui/material';
// redux
// images
import ImageNoOffer from 'assets/icons/Nodata.svg';
// import { OptionSelectCustom } from 'constants';
import { getOrderOfItem } from 'api/items/itemsApi';

const listOption: any = [
	{ name: 'Listings', value: 0 },
	{ name: 'Offerings', value: 1 },
];
interface Props {
	itemId: string;
}
export default function OfferingsAndLisings({ itemId }: Props) {
	// useState
	const [currentOption, setCurrentOption] = useState<any>(listOption[0]);
	const [listOrderSell, setListOrderSell] = useState<any>([]);
	const [listOrderOffer, setListOrderOffer] = useState<any>([]);
	const [isLoad, setIsLoading] = useState(false);
	// useSelector
	const handleChangeOption = (option: any) => {
		if (option) {
			setCurrentOption(option);
		}
	};
	async function getOrderOfItemFc() {
		// call api get order of item
		setListOrderSell(await getOrderOfItem(itemId));
		setIsLoading(true);
	}
	useEffect(() => {
		console.log(listOrderSell);
	}, [listOrderSell]);
	useEffect(() => {
		getOrderOfItemFc();
	}, [itemId]);
	// functions

	return (
		<Wrapper sx={{ mt: 4, position: 'absolute', left: '0', right: '0' }}>
			{/* <Box sx={{ mb: 1 }}>
				<SelectCustom
					currentItem={currentOption}
					listItem={listOption}
					onChange={handleChangeOption}
					sx={{
						padding: '8px',
						width: 'fit-content',
						minWidth: '140px',
						background: 'rgb(0, 122, 255)',
						color: '#fff',
					}}
				/>
			</Box> */}

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
				{/* {currentOption.value === 0 ? (
					<>
						{!isLoad ? (
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
				) : (
					<>
						{!isLoad ? (
							<OrderList>
								{listOrderOffer && listOrderOffer.length > 0 ? (
									listOrderOffer.map((orderId: any, index: number) => (
										<Box sx={{ mb: 1, minWidth: '350px' }} key={index}>
											<OrderInItemDetailCard
												orderId={orderId}
												isLoading={isLoad}
											/>
										</Box>
									))
								) : (
									<Box sx={{ mt: 2, p: 1 }}>
										<Typography variant="body1" sx={{ textAlign: 'center' }}>
											No offering yet!
										</Typography>
									</Box>
								)}
							</OrderList>
						) : (
							<SkeletonOfferInItemDetailList />
						)}
					</>
				)} */}
			</OrderListWrapper>
		</Wrapper>
	);
}
