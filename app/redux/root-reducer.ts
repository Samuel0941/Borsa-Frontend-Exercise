import userReducer from "./user/slice";
import { UserStateType } from "./user/type";

export type StateType = {
  user: UserStateType;
};

const rootReducers = {
  user: userReducer,
};

export default rootReducers;
