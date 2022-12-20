import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from '../../models/user';
import { web3Info } from '../../models/web3Info';
export interface userState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	userInfo: User | null;
	web3Info: web3Info;
}
const initialState: userState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	userInfo: null,
	web3Info: { chainId: '97' },
};
const startLoading: CaseReducer<userState> = (state) => {
	state.isLoading = true;
};
const hasError: CaseReducer<userState, PayloadAction<any>> = (state, action) => {
	state.isLoading = false;
	state.isSuccess = false;
	state.errorMessage = action.payload;
};
const getChainId: CaseReducer<userState, PayloadAction<web3Info>> = (state, action) => {
	state.web3Info = action.payload;
};
const getUserSuccess: CaseReducer<userState, PayloadAction<User>> = (state, action) => {
	state.isLoading = false;
	state.isSuccess = true;
	state.userInfo = action.payload;
};
const logOutUserSuccess: CaseReducer<userState> = (state) => {
	state.isLoading = false;
	state.isSuccess = true;
	state.userInfo = null;
};
// const logOutUserSuccess
export const userSlice = createSlice({
	name: 'userInfo',
	initialState: initialState,
	reducers: {
		startLoading,
		hasError,
		getUserSuccess,
		logOutUserSuccess,
		getChainId,
	},
});

export const startLoadingA = userSlice.actions.startLoading;
export const hasErrorA = userSlice.actions.hasError;
export const getUserSuccessA = userSlice.actions.getUserSuccess;
export const logOutUserSuccessA = userSlice.actions.logOutUserSuccess;
export const getChainIdA = userSlice.actions.getChainId;

export const selectUser = (state: RootState) => state.userSlice.userInfo;
export const selectLoading = (state: RootState) => state.userSlice.isLoading;
export const selectSuceess = (state: RootState) => state.userSlice.isSuccess;
export const selectWeb3 = (state: RootState) => state.userSlice.web3Info;

export default userSlice.reducer;
