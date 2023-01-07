import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

import { walletsModalConnect } from '../../models/modals';
export interface modalWalletConnect {
	steps: walletsModalConnect;
}

const initialState: modalWalletConnect = {
	steps: { firstModal: false, secondModal: false, thirdModal: false },
};

export const modalWalletSlice = createSlice({
	name: 'modalWallet',
	initialState: initialState,
	reducers: {
		openFirstModal(state) {
			state.steps = {
				secondModal: false,
				thirdModal: false,
				firstModal: !state.steps.firstModal,
			};
		},
		openSecondModal(state) {
			state.steps = {
				...state.steps,
				firstModal: false,
				secondModal: !state.steps.secondModal,
			};
		},
		openThirdModal(state) {
			state.steps = {
				...state.steps,
				thirdModal: !state.steps.thirdModal,
			};
		},
		closeModal(state) {
			state.steps.firstModal = false;
			state.steps.secondModal = false;
			state.steps.thirdModal = false;
		},
		closeFirstModal(state) {
			state.steps = { ...state.steps, firstModal: false };
		},
	},
});

//selector
export const sellectStepsModalWallet = (state: RootState) => state.modalWalletSlice;
export const { openFirstModal, openSecondModal, openThirdModal, closeModal, closeFirstModal } =
	modalWalletSlice.actions;

export default modalWalletSlice.reducer;
