/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { SellingProps } from 'models/transaction';
import { ORDER_CONFIGURATION } from 'constants/sellItem';
import moment from 'moment';
const initialState: SellingProps = {
	isErc1155: true,
	saleKind: ORDER_CONFIGURATION.FIXED_PRICE,
	tokenPayment: null,
	fixedPrice: 0,
	startPrice: 0,
	endPrice: 0,
	quantity: 0,
	maxSupply: 1,
	// feeMethod: ORDER_CONFIGURATION.SPLIT_FEE_METHOD,
	startTime: new Date().toString(),
	endTime: moment(Date.now()).add(7, 'days').toDate().toString(),
};

export const createOrderNftSlice = createSlice({
	name: 'filterNFT',
	initialState: initialState,
	reducers: {
		createOrder(state, action) {
			state = action.payload;
		},
		setStartTime(state, action) {
			state.startTime = action.payload;
		},
		setEndTime(state, action) {
			state.endTime = action.payload;
		},
		handleReset(state) {
			state = initialState;
		},
	},
});

//selector
export const selectOrder = (state: RootState) => state.createOrderNft;
export const selectStartTime = (state: RootState) => state.createOrderNft.startTime;
export const selectEndTime = (state: RootState) => state.createOrderNft.endTime;
export const { createOrder, handleReset, setStartTime, setEndTime } = createOrderNftSlice.actions;
export default createOrderNftSlice.reducer;
