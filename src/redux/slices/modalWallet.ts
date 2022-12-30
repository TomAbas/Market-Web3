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
			console.log('chay close modal');
			state.steps.firstModal = false;
			state.steps.secondModal = false;
			state.steps.thirdModal = false;
		},
		closeFirstModal(state) {
			console.log('chay close modal1');
			state.steps = { ...state.steps, firstModal: false };
		},
	},
});

//selector
export const sellectStepsModalWallet = (state: RootState) => state.modalWalletSlice;
export const { openFirstModal, openSecondModal, openThirdModal, closeModal, closeFirstModal } =
	modalWalletSlice.actions;

export default modalWalletSlice.reducer;
