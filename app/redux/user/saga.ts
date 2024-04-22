import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse, isAxiosError } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../axios";
import {
  getUsersErrorAction,
  getUsersSuccessAction,
  loginErrorAction,
  loginSuccessAction,
  registerUserErrorAction,
  registerUserSuccessAction,
  updateProfileErrorAction,
  updateProfileSuccessAction,
} from "./slice";
import { AuthenticatedUser, PagedUserResponse, USERS } from "./type";

function* registerUserSaga({
  payload,
}: PayloadAction<{
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  profilePic: string;
  isBuyer: boolean;
}>) {
  try {
    const response: AxiosResponse<AuthenticatedUser> = yield axiosInstance.post(
      `/${USERS}/register/v2`,
      payload
    );
    yield put(registerUserSuccessAction(response.data));
  } catch (error) {
    if (isAxiosError(error) && error.response?.data.success === false) {
      yield put(registerUserErrorAction(error.response?.data));
    } else {
      yield put(
        registerUserErrorAction({ message: "Signup Failed", success: false })
      );
    }
  }
}

function* updateProfileSaga({
  payload,
}: PayloadAction<{
  id: string;
  body: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    isBuyer: boolean;
    address: string;
    profilePic: string;
  };
}>) {
  try {
    const response: AxiosResponse<AuthenticatedUser> = yield axiosInstance.put(
      `/${USERS}/profile?id=${payload.id}`,
      payload.body
    );
    yield put(updateProfileSuccessAction(response.data));
  } catch (error: any) {
    if (isAxiosError(error) && error.response?.data.success === false) {
      yield put(updateProfileErrorAction(error.response?.data));
    } else {
      console.log(error.request);
      yield put(
        updateProfileErrorAction({
          message: "Profile Update Failed",
          success: false,
        })
      );
    }
  }
}

function* loginSaga({
  payload,
}: PayloadAction<{ email: string; password: string }>) {
  try {
    const response: AxiosResponse<AuthenticatedUser> = yield axiosInstance.post(
      `/${USERS}/login`,
      payload
    );
    yield put(loginSuccessAction(response.data));
  } catch (error) {
    if (isAxiosError(error) && error.response?.data.success === false) {
      yield put(loginErrorAction(error.response?.data));
    } else {
      yield put(
        loginErrorAction({ message: "Failed to login", success: false })
      );
    }
  }
}

function* getUsersSaga({
  payload,
}: PayloadAction<{ page?: number; limit?: number }>) {
  try {
    const object: any = payload;

    const query = Object.keys(object)
      .map((key) => `${key}=${object[key]}`)
      .join("&");

    const response: AxiosResponse<PagedUserResponse> = yield axiosInstance.get(
      `/${USERS}/fetch/dummy/user-v2?${query}`
    );
    yield put(getUsersSuccessAction(response.data));
  } catch (error) {
    if (isAxiosError(error) && error.response?.data.success === false) {
      yield put(getUsersErrorAction(error.response?.data));
    } else {
      yield put(
        getUsersErrorAction({
          message: "Failed to fetch, please try again.",
          success: false,
        })
      );
    }
  }
}

// Generator function
export function* watchRegisterUser() {
  yield takeLatest(`${USERS}/registerUserAction`, registerUserSaga);
}

export function* watchProfileUpdate() {
  yield takeLatest(`${USERS}/updateProfileAction`, updateProfileSaga);
}

export function* watchLogin() {
  yield takeLatest(`${USERS}/loginAction`, loginSaga);
}

export function* watchGetUsers() {
  yield takeLatest(`${USERS}/getUsersAction`, getUsersSaga);
}
