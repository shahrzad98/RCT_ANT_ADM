import { createAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { useImmerReducer } from 'use-immer';

import { ApiDataItem, ApiResponse, AppError, AppResponse } from '../../types';
import { handleAxiosError, isDevelopment, sleep } from '../../utils/helpers';

const ResetAt = 'reset';
const resetAc = createAction(ResetAt);

const BeginAt = 'begin';
const beginAc = createAction(BeginAt);

const ErrorAt = 'error';

const errorAc = createAction<AppError>(ErrorAt);

const SuccessAt = 'success';
const successAc = createAction<any>(SuccessAt);

const BeginMockAt = 'beginMock';
const beginMockAc = createAction(BeginMockAt);

const EndMockAt = 'endMock';
const endMockAc = createAction<{ error: boolean }>(EndMockAt);

type Actions =
  | ReturnType<typeof resetAc>
  | ReturnType<typeof beginAc>
  | ReturnType<typeof errorAc>
  | ReturnType<typeof successAc>
  | ReturnType<typeof beginMockAc>
  | ReturnType<typeof endMockAc>;

type State = {
  error?: AppError;
  pending: boolean;
  success: boolean;
  response?: AppResponse;
};
type Options = {
  notificationOnError: boolean;
  apiDataItem?: ApiDataItem;
  cancelMessage?: string;
};
const useHttpCall = <
  Fn extends (data: any) => Promise<ApiResponse<any> | { ___customCancel___: boolean }>
>(
  httpPromise: Fn,
  options?: Partial<Options>,
) => {
  const initialState: State = {
    pending: false,
    success: false,
  };

  const usageOptions = useMemo<Options>(() => {
    return {
      notificationOnError: options?.notificationOnError ?? false,
    };
  }, [options]);

  const [state, dispatch] = useImmerReducer<State>((draftState, action: Actions) => {
    switch (action.type) {
      case ResetAt:
        draftState.error = undefined;
        draftState.response = undefined;
        draftState.pending = false;
        draftState.success = false;
        break;
      case BeginAt:
        draftState.success = false;
        draftState.error = undefined;
        draftState.response = undefined;
        draftState.pending = true;
        break;
      case ErrorAt:
        draftState.pending = false;
        draftState.error = action.payload;
        break;
      case SuccessAt:
        draftState.pending = false;
        draftState.success = true;
        draftState.response = action.payload;
        break;
      case BeginMockAt:
        draftState.error = undefined;
        draftState.response = undefined;
        draftState.pending = true;
        draftState.success = false;
        break;
      case EndMockAt:
        if (action.payload.error) {
          draftState.error = { message: '__CUSTOM__' };
        } else {
          draftState.error = undefined;
        }
        draftState.response = undefined;
        draftState.pending = false;
        draftState.success = true;
        break;
    }
  }, initialState);

  const call = async <T>(
    data: Parameters<Fn>[0],
    throwOnError?: boolean,
    delayMilliseconds?: number,
  ) => {
    dispatch(beginAc());

    if (delayMilliseconds) {
      await sleep(delayMilliseconds);
    }

    const response = await httpPromise(data);

    const cancelled = (response as { ___customCancel___: boolean }).___customCancel___;
    if (cancelled) {
      return;
    }

    const error = handleAxiosError(response as ApiResponse<any>);
    if (error) {
      if (throwOnError) {
        throw error;
      }
      dispatch(errorAc(error));
      if (!Axios.isCancel(response)) {
        if (usageOptions.notificationOnError) {
          notification.error({
            message: error.message,
          });
        }
        return (response as AxiosError<AppResponse<T>>).response?.data;
      } else {
        return { error: { message: '__CUSTOM__' } } as AppResponse<T>;
      }
    } else {
      dispatch(successAc((response as AxiosResponse<AppResponse<T>>).data));
      return (response as AxiosResponse<AppResponse<T>>).data;
    }
  };

  const callFullResponse = async <T>(
    data: Parameters<Fn>[0],
    throwOnError?: boolean,
    delayMilliseconds?: number,
  ) => {
    dispatch(beginAc());

    if (delayMilliseconds) {
      await sleep(delayMilliseconds);
    }

    const response = await httpPromise(data);

    const cancelled = (response as { ___customCancel___: boolean }).___customCancel___;
    if (cancelled) {
      return;
    }

    const error = handleAxiosError(response as ApiResponse<any>);
    if (error) {
      if (throwOnError) {
        throw error;
      }
      dispatch(errorAc(error));
      if (!Axios.isCancel(response)) {
        if (usageOptions.notificationOnError) {
          notification.error({
            message: error.message,
          });
        }
      }
    } else {
      dispatch(successAc((response as AxiosResponse<AppResponse<T>>).data));
      return response;
    }
  };

  const reset = () => {
    dispatch(resetAc());
  };

  const mock = async (ms: number = 2000, error: boolean = false) => {
    if (isDevelopment()) {
      dispatch(beginMockAc());
      await sleep(ms);
      dispatch(endMockAc({ error: error }));
    } else {
      throw new Error('Mock only works in development');
    }
  };
  return {
    call,
    callFullResponse,
    error: state.error,
    pending: state.pending,
    success: state.success,
    response: state.response,
    reset,
    mock,
  };
};

export default useHttpCall;
