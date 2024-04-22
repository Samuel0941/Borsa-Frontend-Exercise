import { ApiState } from "../redux-type";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  profilePic?: string;
  isBuyer: boolean;
}

export type AuthenticatedUser = User & { token: string };

export type PagedUserResponse = {
  total: number;
  data: User[];
};

export type UserStateType = {
  registerUser: ApiState<AuthenticatedUser | null>;
  login: ApiState<AuthenticatedUser | null>;
  users: ApiState<PagedUserResponse>;
  updateProfile: ApiState<User | null>;
};

export const USERS = "users";
export type USERS = typeof USERS;
