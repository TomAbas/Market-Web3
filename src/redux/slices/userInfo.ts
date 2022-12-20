import { CaseReducer, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "../../models/user";
import { Response } from "../../models/common";
export interface userState {
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  userInfo: User | null;
}
const initialState: userState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  userInfo: null,
};
const startLoading: CaseReducer<userState> = (state) => {
  state.isLoading = true;
};
const hasError: CaseReducer<userState, PayloadAction<any>> = (
  state,
  action
) => {
  state.isLoading = false;
  state.isSuccess = false;
  state.errorMessage = action.payload;
};
const getUserSuccess: CaseReducer<userState, PayloadAction<Response<User>>> = (
  state,
  action
) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.userInfo = action.payload.data;
};
const logOutUserSuccess: CaseReducer<userState> = (state) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.userInfo = null;
};
// const logOutUserSuccess
export const userSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {
    startLoading,
    hasError,
    getUserSuccess,
    logOutUserSuccess,
  },
});

export { startLoading, hasError, getUserSuccess, logOutUserSuccess };

export const selectUser = (state: RootState) => state.userSlice.userInfo;
export const selectLoading = (state: RootState) => state.userSlice.isLoading;
export const selectSuceess = (state: RootState) => state.userSlice.isSuccess;

export default userSlice.reducer;
