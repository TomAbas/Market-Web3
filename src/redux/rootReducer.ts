import { combineReducers } from '@reduxjs/toolkit';
import userSliceReducer from './slices/userInfo';
import modalWalletReducer from './slices/modalWallet';
import modalGuardReducer from './slices/modalGuard';
import nftFilterReducer from './slices/nftFilter';
export const rootReducer = combineReducers({
	userSlice: userSliceReducer,
	modalWalletSlice: modalWalletReducer,
	modalGuard: modalGuardReducer,
	nftFilter: nftFilterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
