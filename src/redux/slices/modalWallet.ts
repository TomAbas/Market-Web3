import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

import { walletsModalConnect } from '../../models/walletModal';
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
			state.steps = { ...state.steps, firstModal: !state.steps.firstModal };
		},
		openSecondModal(state) {
			state.steps = {
				...state.steps,
				firstModal: false,
				secondModal: !state.steps.secondModal,
			};
		},
		openThirdModal(state) {
			state.steps = { ...state.steps, secondModal: false, thirdModal: true };
		},
		closeModal(state) {
			state.steps = {
				...state.steps,
				firstModal: false,
				secondModal: false,
			};
		},
	},
});

//selector
export const sellectStepsModalWallet = (state: RootState) => state.modalWalletSlice;
export const { openFirstModal, openSecondModal, openThirdModal, closeModal } =
	modalWalletSlice.actions;

export default modalWalletSlice.reducer;
