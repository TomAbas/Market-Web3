import { combineReducers } from '@reduxjs/toolkit';
import userSliceReducer from './slices/userInfo';
import modalWalletReducer from './slices/modalWallet';
import modalGuardReducer from './slices/modalGuard';
import nftFilterReducer from './slices/nftFilter';
import listNftOrdersReducer from './slices/orderResource';
export const rootReducer = combineReducers({
	userSlice: userSliceReducer,
	modalWalletSlice: modalWalletReducer,
	modalGuard: modalGuardReducer,
	nftFilter: nftFilterReducer,
	listNftOrders: listNftOrdersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
