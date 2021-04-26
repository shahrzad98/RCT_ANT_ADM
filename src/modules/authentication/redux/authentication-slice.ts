import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserPermission } from '../../../features/constants';
import { ApiReduxState, AppError } from '../../../types';
import {
  resetApiState,
  setApiErrorState,
  setApiPendingState,
  setApiSuccessState,
} from '../../../utils/helpers';
import { LoginPayload, TokenAuthLoginResponse } from '../types';

type AuthenticationState = {
  test: string;
  username?: string;
  userId?: number;
  loginTime?: Date;
  isAuthenticated: boolean;
  forgotPasswordSentSwitch: boolean;
  permissions: readonly UserPermission[];
  authToken?: TokenAuthLoginResponse;
  loginApi: ApiReduxState;
};

const initialState: AuthenticationState = {
  test: '',
  loginTime: undefined,
  isAuthenticated: false,
  forgotPasswordSentSwitch: false,
  permissions: [],
  loginApi: {},
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    forgotPasswordSentSwitch: (state, action: PayloadAction<boolean>) => {
      state.forgotPasswordSentSwitch = action.payload;
    },
    loginPending: (state) => {
      setApiPendingState(state.loginApi);
    },
    setAuthToken: (state, action: PayloadAction<TokenAuthLoginResponse>) => {
      state.authToken = action.payload;
      state.userId = action.payload.user.id;
      state.username = action.payload.user.userName;
    },
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = true;
      state.loginTime = action.payload.time;

      resetApiState(state.loginApi);
    },
    test: (state) => {
      state.test = 'test';
    },
    loginError: (state, action: PayloadAction<AppError>) => {
      setApiErrorState(state.loginApi, action.payload);
    },
    setPermissions: (state, action: PayloadAction<readonly string[]>) => {
      state.permissions = action.payload as UserPermission[];
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.loginTime = undefined;
      state.permissions = [];
      state.authToken = undefined;
    },
  },
});

export default authenticationSlice;
