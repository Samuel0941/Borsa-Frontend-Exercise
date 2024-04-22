import { all, fork } from "redux-saga/effects";
import {
  watchRegisterUser,
  watchLogin,
  watchGetUsers,
  watchProfileUpdate,
} from "./user/saga";

export default function* RootSaga() {
  yield all([
    fork(watchRegisterUser),
    fork(watchLogin),
    fork(watchGetUsers),
    fork(watchProfileUpdate),
  ]);
}
