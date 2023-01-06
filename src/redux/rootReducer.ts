import { combineReducers } from '@reduxjs/toolkit';
import userSliceReducer from './slices/userInfo';
import modalWalletReducer from './slices/modalWallet';
import modalGuardReducer from './slices/modalGuard';
export const rootReducer = combineReducers({
	userSlice: userSliceReducer,
	modalWalletSlice: modalWalletReducer,
	modalGuard: modalGuardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
