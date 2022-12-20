import { combineReducers } from '@reduxjs/toolkit';
import userSliceReducer from './slices/userInfo';
import modalWalletReducer from './slices/modalWallet';

export const rootReducer = combineReducers({
	userSlice: userSliceReducer,
	modalWalletSlice: modalWalletReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
