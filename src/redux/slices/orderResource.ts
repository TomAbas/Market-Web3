/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface listOrderState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listNftOrders: any[];
}

const initialState: listOrderState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listNftOrders: [],
};

export const nftOrderSlice = createSlice({
	name: 'listNftOrders',
	initialState: initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true;
		},
		hasError(state, action) {
			state.isLoading = false;
			state.isSuccess = false;
			state.errorMessage = action.payload;
		},
		getListNftOrders(state, action) {
			state.listNftOrders = action.payload;
			state.isLoading = false;
			state.isSuccess = true;
		},
	},
});

//selector
export const selectListNftOrders = (state: RootState) => state.listNftOrders.listNftOrders;
export const selectListOrdersSuccess = (state: RootState) => state.listNftOrders.isSuccess;
export const selectListOrdersLoading = (state: RootState) => state.listNftOrders.isLoading;
export const { getListNftOrders, startLoading, hasError } = nftOrderSlice.actions;

export default nftOrderSlice.reducer;
