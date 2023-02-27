/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { filterNft } from 'models/common';
export interface AllNftsState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listNFTs: any[];
	listAllCollection: any[];
	filter: filterNft;
	trigger: boolean;
}

const initialState: AllNftsState = {
	isLoading: true,
	isSuccess: false,
	errorMessage: '',
	listNFTs: [],
	listAllCollection: [],
	filter: {
		itemName: '',
		minPrice: '',
		maxPrice: '',
		isFiltering: false,
		status: [],
		collectionId: [],
		statusRoyal: [],
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
		getAllCollections(state, action) {
			state.listAllCollection = action.payload;
			state.isLoading = false;
		},
		setFilter(state, action) {
			state.filter = { ...state.filter, ...action.payload, isFiltering: true };
		},
		handleReset(state) {
			state.filter = initialState.filter;
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
export const selectAllCollections = (state: RootState) => state.nftFilter.listAllCollection;
export const { setFilter, handleReset, getAllNfts, handleTrigger, getAllCollections } =
	nftFilterSlice.actions;

export default nftFilterSlice.reducer;
