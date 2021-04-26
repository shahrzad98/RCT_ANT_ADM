import { createAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { LocalStorageKey } from '../../../features/constants';
import { AppResponse, PayloadWithHistory } from '../../../types';
import { abpApi, setJsonStorage } from '../../../utils/helpers';
import { accountSlice } from '../../account';
import { getCurrentProfileHttp } from '../../account/http/account-http';
import { GetCurrentProfileResponse } from '../../account/types';
import { getPermissionsHttp, loginHttp } from '../http/authentication-http';
import { TokenAuthLoginResponse } from '../types';
import authenticationSlice from './authentication-slice';

//#region actions
const prefix = 'authentication_saga';

const Login = `${prefix}/login`;
type LoginSagaPayload = {
  username: string;
  password: string;
};
export const loginSaga = createAction<PayloadWithHistory<LoginSagaPayload>>(Login);

//#endregion

function* login(action: ReturnType<typeof loginSaga>) {
  if (action.payload.username === 'demo@demo.ir' && action.payload.password === 'demo#!@#@123') {
    localStorage.setItem('TempLogin', '1');
    yield put(authenticationSlice.actions.loginSuccess({ time: new Date() }));
    action.payload.history.push('/');
  }
  // const loginResponse: AppResponse<TokenAuthLoginResponse> = yield call(
  //   abpApi,
  //   loginHttp,
  //   action.payload,
  //   authenticationSlice.actions.loginPending,
  //   authenticationSlice.actions.loginError
  // );
  // const loginResponse = { result: { authToken: 'AAAAA' } };
  // if (loginResponse) {
  //   yield put(authenticationSlice.actions.setAuthToken(loginResponse.result!));
  //   setJsonStorage(LocalStorageKey.AuthToken, loginResponse.result, loginResponse.result!.expireInSeconds);
  //   const { result: profile }: AppResponse<GetCurrentProfileResponse> = yield call(
  //     abpApi,
  //     getCurrentProfileHttp,
  //     undefined,
  //     undefined,
  //     authenticationSlice.actions.loginError
  //   );
  //   yield put(accountSlice.actions.updateProfileSuccess(profile!));
  //   yield put(accountSlice.actions.updateProfileReset());
  //
  //   const permissionsResponse: AppResponse<string[]> = yield call(abpApi, getPermissionsHttp, undefined, undefined, authenticationSlice.actions.loginError);
  //   if (!permissionsResponse || !permissionsResponse.result) {
  //     return;
  //   }
  //   yield put(authenticationSlice.actions.setPermissions(permissionsResponse.result));
  //
  //   yield put(authenticationSlice.actions.loginSuccess({ time: new Date() }));
  //   action.payload.history.push('/');
  // }
}

export function* watchAuthentication() {
  yield all([takeLatest(Login, login)]);
}
