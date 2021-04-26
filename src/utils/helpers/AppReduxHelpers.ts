import { ApiReduxState, AppError } from '../../types';

export const setApiPendingState = (state: ApiReduxState) => {
  state.pending = true;
  state.success = false;
  state.error = undefined;
};

export const setApiErrorState = (state: ApiReduxState, error: AppError) => {
  state.pending = false;
  state.success = false;
  state.error = error;
};

export const setApiSuccessState = (state: ApiReduxState) => {
  state.pending = false;
  state.success = true;
  state.error = undefined;
};

export const resetApiState = (state: ApiReduxState) => {
  state.pending = false;
  state.success = false;
  state.error = undefined;
};
