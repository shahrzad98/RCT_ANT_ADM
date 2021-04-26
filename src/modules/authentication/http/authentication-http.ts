import Axios from 'axios';

import { AxiosInstanceData } from '../../../types';
import { AuthenticationApiDataMap, AuthenticationApiUrls } from './authentication-apiData';

const axiosInstance = Axios.create();
axiosInstance.defaults.baseURL = process.env.REACT_APP_AuthenticationApiBaseUrl;

export const forgotPasswordHttp = (username: string) => {
  return axiosInstance.post(AuthenticationApiUrls.ForgotPassword, { emailOrPhoneNumber: username });
};

export const loginHttp = () => {
  return axiosInstance.post(AuthenticationApiUrls.Login);
};

export const getPermissionsHttp = () => {
  return axiosInstance.get(AuthenticationApiUrls.GetPermissions);
};

export const AuthenticationAxiosData: AxiosInstanceData = {
  instance: axiosInstance,
  DataMap: {
    MapObject: AuthenticationApiDataMap,
    Urls: AuthenticationApiUrls,
  },
};
