import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { accountGuardModal } from '../../models/modals';

const initialState: accountGuardModal = {
	isNeedGuard: false,
};

export const modalGuard = createSlice({
	name: 'modalGuard',
	initialState: initialState,
	reducers: {
		letGuard(state) {
			state.isNeedGuard = true;
		},
		stopGuard(state) {
			state.isNeedGuard = false;
		},
	},
});

//selector
export const sellectStateGuard = (state: RootState) => state.modalGuard.isNeedGuard;
export const { letGuard, stopGuard } = modalGuard.actions;
export default modalGuard.reducer;
