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
	trigger: boolean;
}

const initialState: AllNftsState = {
	isLoading: true,
	isSuccess: false,
	errorMessage: '',
	listNFTs: [],
	filter: {
		minPrice: '',
		maxPrice: '',
		isFiltering: false,
	},
	trigger: false,
};

export const nftFilterSlice = createSlice({
	name: 'filterNFT',
	initialState: initialState,
	reducers: {
		getAllNfts(state, action) {
			state.listNFTs = action.payload;
			state.isLoading = false;
		},
		setFilter(state, action) {
			state.filter = { ...action.payload, isFiltering: true };
		},
		handleReset(state) {
			state = initialState;
		},
		handleTrigger(state) {
			state.trigger = !state.trigger;
		},
	},
});

//selector
export const selectFilter = (state: RootState) => state.nftFilter.filter;
export const selectAllNfts = (state: RootState) => state.nftFilter.listNFTs;
export const selectLoadingAllNfts = (state: RootState) => state.nftFilter.isLoading;
export const selectTrigger = (state: RootState) => state.nftFilter.trigger;
export const { setFilter, handleReset, getAllNfts, handleTrigger } = nftFilterSlice.actions;

export default nftFilterSlice.reducer;
