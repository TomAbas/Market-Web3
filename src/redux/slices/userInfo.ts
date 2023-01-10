import { CaseReducer, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from '../../models/user';
export interface userState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	userInfo: User | null;
	isOpenEdit: boolean;
	isOpenSetting: boolean;
}
const initialState: userState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	userInfo: null,
	isOpenEdit: false,
	isOpenSetting: false,
};
const startLoading: CaseReducer<userState> = (state) => {
	state.isLoading = true;
};
const hasError: CaseReducer<userState, PayloadAction<any>> = (state, action) => {
	state.isLoading = false;
	state.isSuccess = false;
	state.errorMessage = action.payload;
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
const updateInfoUser: CaseReducer<userState, PayloadAction<User>> = (state, action) => {
	state.userInfo = action.payload;
};
const toggleEditModal: CaseReducer<userState> = (state) => {
	state.isOpenEdit = !state.isOpenEdit;
};
const toggleSettingModal: CaseReducer<userState> = (state) => {
	state.isOpenSetting = !state.isOpenSetting;
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
		updateInfoUser,
		toggleEditModal,
		toggleSettingModal,
	},
});

export const startLoadingA = userSlice.actions.startLoading;
export const hasErrorA = userSlice.actions.hasError;
export const getUserSuccessA = userSlice.actions.getUserSuccess;
export const updateInfoUserA = userSlice.actions.updateInfoUser;
export const logOutUserSuccessA = userSlice.actions.logOutUserSuccess;
export const toggleEditModalA = userSlice.actions.toggleEditModal;
export const toggleSettingModalA = userSlice.actions.toggleSettingModal;

export const selectUser = (state: RootState) => state.userSlice.userInfo;
export const selectLoading = (state: RootState) => state.userSlice.isLoading;
export const selectSuceess = (state: RootState) => state.userSlice.isSuccess;
export const selectEditModal = (state: RootState) => state.userSlice.isOpenEdit;
export const selectSettingModal = (state: RootState) => state.userSlice.isOpenSetting;

export default userSlice.reducer;
