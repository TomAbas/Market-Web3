/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography } from '@mui/material';
import { orderSell } from 'models/transaction';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

export interface IAppProps {
	auctionDetail: orderSell;
}

export default function DescriptionTab({ auctionDetail }: IAppProps) {
	return (
		<Fragment>
			<Typography mt={1}>{auctionDetail.itemInfo.description}</Typography>
		</Fragment>
	);
}
