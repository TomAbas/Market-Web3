import { combineReducers } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userInfo";

export const rootReducer = combineReducers({ userSlice: userSliceReducer });

export type RootState = ReturnType<typeof rootReducer>;
