import { ApiDataItem } from '../../../types';

export enum AuthenticationApiUrls {
  ForgotPassword = '/api/services/app/Account/ForgotPassword',
  Login = '/api/TokenAuth/Login',
  GetPermissions = '/api/services/app/Profile/GetPermissions',
}

export const AuthenticationApiDataMap: Map<string, ApiDataItem> = new Map();
