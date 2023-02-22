import { Typography } from '@mui/material';
import { itemHistory, TYPE_TRANSACTION } from 'models/item';
import React from 'react';
import { changePriceToToken, formatAddressHistory } from 'utils/function';
import { StyledSpan } from './styled';

interface Props {
	itemHistory: itemHistory;
	userAddress: string | undefined;
}
function getTransactionType(type: number) {
	return TYPE_TRANSACTION[type];
}

const TypeEvent: React.FC<Props> = ({ itemHistory, userAddress }) => {
	if (itemHistory.type === 1) {
		//mint
		return (
			<Typography variant="body1" sx={{ fontWeight: '500' }}>
				<StyledSpan>{formatAddressHistory(itemHistory!.from, userAddress)}</StyledSpan>{' '}
				{getTransactionType(itemHistory.type)}{' '}
				<StyledSpan>
					{itemHistory.itemInfo
						? `${itemHistory.itemInfo.itemName}`
						: `${itemHistory.collectionInfo.collectionName}`}
				</StyledSpan>
			</Typography>
		);
	} else if (itemHistory.type === 4) {
		//cancel
		return (
			<Typography variant="body1" sx={{ fontWeight: '500' }}>
				<StyledSpan>{formatAddressHistory(itemHistory!.from, userAddress)}</StyledSpan>{' '}
				{getTransactionType(itemHistory.type)}{' '}
				<StyledSpan>
					{itemHistory.quantity} {itemHistory.itemInfo.itemName} to{' '}
					{formatAddressHistory(itemHistory!.to, userAddress)}
				</StyledSpan>
			</Typography>
		);
	} else if (itemHistory.type === 5) {
		//cancel
		return (
			<Typography variant="body1" sx={{ fontWeight: '500' }}>
				<StyledSpan>{formatAddressHistory(itemHistory!.from, userAddress)}</StyledSpan>{' '}
				{getTransactionType(itemHistory.type)}{' '}
			</Typography>
		);
	} else if (itemHistory.type === 6) {
		//list
		return (
			<Typography variant="body1" sx={{ fontWeight: '500' }}>
				<StyledSpan>{formatAddressHistory(itemHistory!.from, userAddress)}</StyledSpan>{' '}
				{getTransactionType(itemHistory.type)}{' '}
				<StyledSpan>
					{itemHistory.quantity} {itemHistory.itemInfo.itemName} for{' '}
					{changePriceToToken(itemHistory.price)}{' '}
					{itemHistory.priceType?.split('::').slice(-1)[0].toUpperCase()}{' '}
				</StyledSpan>
			</Typography>
		);
	} else if (itemHistory.type === 7) {
		//order
		return (
			<Typography variant="body1" sx={{ fontWeight: '500' }}>
				<StyledSpan>{formatAddressHistory(itemHistory!.from, userAddress)}</StyledSpan>{' '}
				{getTransactionType(itemHistory.type)}{' '}
				<StyledSpan>
					{itemHistory.quantity} {itemHistory.itemInfo.itemName} with{' '}
					{changePriceToToken(itemHistory.price)}{' '}
					{itemHistory.priceType?.split('::').slice(-1)[0].toUpperCase()}{' '}
					{formatAddressHistory(itemHistory.to, userAddress)}
				</StyledSpan>
			</Typography>
		);
	} else {
		return <></>;
	}
};

export default TypeEvent;
