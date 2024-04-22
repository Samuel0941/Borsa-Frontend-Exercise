import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initAxios,
  localizedDataData,
  localizedPersonalOnlyData,
} from "../../utils/global.util";
import axiosInstance from "../axios";
import { ResetApiState, ResponseMessage } from "../redux-type";
import {
  AuthenticatedUser,
  PagedUserResponse,
  User,
  USERS,
  UserStateType,
} from "./type";

const usersInitialState: UserStateType = {
  registerUser: ResetApiState(null),
  users: ResetApiState({
    total: 0,
    data: [],
  }),
  login: ResetApiState(null),
  updateProfile: ResetApiState(null),
};

export const UserSlice = createSlice({
  name: USERS,
  initialState: usersInitialState,
  reducers: {
    // SIGNUP ACTIONS
    registerUserAction: (
      state: UserStateType,
      {
        payload,
      }: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
        userName: string;
        address: string;
        profilePic: string;
        isBuyer: boolean;
      }>
    ) => {
      state.registerUser.loading = true;
      state.registerUser.error = null;
      state.registerUser.successful = false;
    },
    registerUserSuccessAction: (
      state: UserStateType,
      { payload }: PayloadAction<AuthenticatedUser>
    ) => {
      localizedDataData(payload);
      initAxios(axiosInstance, payload.token);

      state.registerUser.loading = false;
      state.registerUser.payload = payload;
      state.registerUser.successful = true;
    },
    registerUserErrorAction: (
      state: UserStateType,
      { payload }: PayloadAction<ResponseMessage>
    ) => {
      state.registerUser.loading = false;
      state.registerUser.error = payload.message;
      state.registerUser.successful = false;
    },

    // UPDATE PROFILE ACTIONS
    resetUpdateProfileAction: (
      state: UserStateType,
      { payload }: PayloadAction<undefined>
    ) => {
      state.updateProfile.loading = false;
      state.updateProfile.error = null;
      state.updateProfile.successful = false;
      state.updateProfile.payload = null;
    },
    updateProfileAction: (
      state: UserStateType,
      {
        payload,
      }: PayloadAction<{
        id: string;
        body: {
          firstName: string;
          lastName: string;
          email: string;
          userName: string;
          address: string;
          profilePic: string;
          isBuyer: boolean;
        };
      }>
    ) => {
      state.updateProfile.loading = true;
      state.updateProfile.error = null;
      state.updateProfile.successful = false;
    },
    updateProfileSuccessAction: (
      state: UserStateType,
      { payload }: PayloadAction<User>
    ) => {
      localizedPersonalOnlyData(payload);

      state.updateProfile.loading = false;
      state.updateProfile.payload = payload;
      state.updateProfile.successful = true;
    },
    updateProfileErrorAction: (
      state: UserStateType,
      { payload }: PayloadAction<ResponseMessage>
    ) => {
      state.updateProfile.loading = false;
      state.updateProfile.error = payload.message;
      state.updateProfile.successful = false;
    },

    // LOGIN ACTIONS
    resetLoginAction: (
      state: UserStateType,
      { payload }: PayloadAction<undefined>
    ) => {
      state.login.loading = false;
      state.login.error = null;
      state.login.successful = false;
      state.login.payload = null;
    },
    loginAction: (
      state: UserStateType,
      { payload }: PayloadAction<{ email: string; password: string }>
    ) => {
      state.login.loading = true;
      state.login.error = null;
      state.login.successful = false;
    },
    loginSuccessAction: (
      state: UserStateType,
      { payload }: PayloadAction<AuthenticatedUser>
    ) => {
      localizedDataData(payload);
      initAxios(axiosInstance, payload.token);

      state.login.loading = false;
      state.login.payload = payload;
      state.login.successful = true;
    },
    loginErrorAction: (
      state: UserStateType,
      { payload }: PayloadAction<ResponseMessage>
    ) => {
      state.login.loading = false;
      state.login.error = payload.message;
      state.login.successful = false;
    },

    // GET ACTIONS
    getUsersAction: (
      state: UserStateType,
      { payload }: PayloadAction<{ page?: number; limit?: number }>
    ) => {
      state.users.loading = true;
      state.users.error = null;
      state.users.successful = false;
    },
    getUsersSuccessAction: (
      state: UserStateType,
      { payload }: PayloadAction<PagedUserResponse>
    ) => {
      state.users.loading = false;
      state.users.payload = payload;
      state.users.successful = true;
    },
    getUsersErrorAction: (
      state: UserStateType,
      { payload }: PayloadAction<ResponseMessage>
    ) => {
      state.users.loading = false;
      state.users.error = payload.message;
      state.users.successful = false;
    },
  },
});

export const {
  registerUserAction,
  registerUserErrorAction,
  registerUserSuccessAction,
  loginErrorAction,
  loginAction,
  loginSuccessAction,
  getUsersAction,
  getUsersSuccessAction,
  getUsersErrorAction,
  updateProfileAction,
  updateProfileErrorAction,
  updateProfileSuccessAction,
  resetLoginAction,
  resetUpdateProfileAction,
} = UserSlice.actions;

export default UserSlice.reducer;
