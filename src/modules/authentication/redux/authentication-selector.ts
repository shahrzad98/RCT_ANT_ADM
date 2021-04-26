import { RootState } from '../../../features/redux';

export const userIdSelector = (state: RootState) => {
  return state.authentication.userId;
};

export const permissionsSelector = (state: RootState) => {
  return state.authentication.permissions;
};
