/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
// styled
import { ContentText, PreviewItemWrapper } from './styled';
import { Title } from '../Styled';
// mui
import {
	Box,
	CircularProgress,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { selectAllNfts } from 'redux/slices/nftFilter';
import { nftItem } from 'models/item';
import { selectOrder } from 'redux/slices/sellItem';

const ReviewItem = () => {
	const order = useAppSelector(selectOrder);
	const { itemId } = useParams();
	const nftItem: nftItem = useAppSelector(selectAllNfts).filter(
		(item: nftItem) => item._id === itemId
	)[0];
	return (
		<>
			{' '}
			<Stack spacing={2} color="#5A5D79">
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Title variant="h6" color="#131740">
						Price:
					</Title>
					<ContentText variant="h6">
						{order.price} {order.currentPaymentToken?.name}
					</ContentText>
				</Box>

				<Box>
					<Title variant="h6" color="#131740">
						Start sale:
					</Title>
					<ContentText variant="h6">
						{moment(order.startTime).format('MMMM DD, YYYY, h:mm a')}
					</ContentText>
				</Box>
				<Box>
					<Title variant="h6" color="#131740">
						End sale:
					</Title>
					<ContentText variant="h6">
						{moment(order.endTime).format('MMMM DD, YYYY, h:mm a')}
					</ContentText>
				</Box>

				<Box>
					<Title variant="h6" color="#131740">
						Fees:
					</Title>
					<ContentText variant="h6">
						Listing is free! At the time of the sale, the following fees will be
						deducted.
					</ContentText>
					<ContentText variant="h6">- Royalties: {nftItem?.royalties / 100}%</ContentText>
					<ContentText variant="h6">- Service fee: 1.8 %</ContentText>
				</Box>
				{/* <Box>
					<ButtonGradient
						onClick={onSubmit}
						disabled={
							!address ||
							!chainId ||
							!currentItem ||
							!tokenPayment?.value ||
							!collection
						}
					>
						<Typography variant="h6">Listing</Typography>
					</ButtonGradient>
				</Box> */}
			</Stack>
		</>
	);
};

export default ReviewItem;
