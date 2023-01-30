/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { filterNft } from 'models/common';
export interface AllNftsState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listNFTs: any[];
	filter: filterNft;
}

const initialState: AllNftsState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listNFTs: [],
	filter: {
		minPrice: '',
		maxPrice: '',
		isFiltering: false,
	},
};

export const nftFilterSlice = createSlice({
	name: 'filterNFT',
	initialState: initialState,
	reducers: {
		setFilter(state, action) {
			state.filter = { ...action.payload, isFiltering: true };
		},
		handleReset(state) {
			state = initialState;
		},
	},
});

//selector
export const selectFilter = (state: RootState) => state.nftFilter.filter;
export const { setFilter, handleReset } = nftFilterSlice.actions;

export default nftFilterSlice.reducer;
