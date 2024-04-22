import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticatedUser, User } from "../redux/user/type";
import {
  CRED_CACHING_KEY,
  CRED_CACHING_KEY_TOKEN,
  CRED_CACHING_KEY_TOKEN_EXPIRES_AT,
} from "../constants/constants";
import { AxiosInstance } from "axios";
import moment from "moment";

export const localizedDataData = async (login: AuthenticatedUser | null) => {
  if (login) {
    const { token, ...rest } = login;
    await AsyncStorage.setItem(CRED_CACHING_KEY, JSON.stringify(rest));

    await AsyncStorage.setItem(CRED_CACHING_KEY_TOKEN, token);

    const expiredAt = moment().add(1, "days").unix();
    await AsyncStorage.setItem(
      CRED_CACHING_KEY_TOKEN_EXPIRES_AT,
      `${expiredAt}`
    );
  } else {
    await AsyncStorage.removeItem(CRED_CACHING_KEY);
    await AsyncStorage.removeItem(CRED_CACHING_KEY_TOKEN);
    await AsyncStorage.removeItem(CRED_CACHING_KEY_TOKEN_EXPIRES_AT);
  }
};

export const localizedPersonalOnlyData = async (data: User | null) => {
  if (data) {
    await AsyncStorage.setItem(CRED_CACHING_KEY, JSON.stringify(data));
  }
};

export const resetLocalizedData = async () => {
  await AsyncStorage.removeItem(CRED_CACHING_KEY);
  await AsyncStorage.removeItem(CRED_CACHING_KEY_TOKEN);
  await AsyncStorage.removeItem(CRED_CACHING_KEY_TOKEN_EXPIRES_AT);
};

export const getCredentialData = () =>
  AsyncStorage.getItem(CRED_CACHING_KEY_TOKEN);

export const getUserData = async (): Promise<AuthenticatedUser | null> => {
  const user = await AsyncStorage.getItem(CRED_CACHING_KEY);

  return user ? JSON.parse(user) : null;
};

export const getExpiresAt = () =>
  AsyncStorage.getItem(CRED_CACHING_KEY_TOKEN_EXPIRES_AT);

export const initAxios = (axiosInstance: AxiosInstance, token: any) => {
  if (token) {
    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    getCredentialData()
      .then((auth) => {
        axiosInstance.defaults.headers.common = {
          Authorization: `Bearer ${auth}`,
        };
      })
      .catch(() => {
        axiosInstance.defaults.headers.common = {
          Authorization: `Bearer -`,
        };
      });
  }
};
