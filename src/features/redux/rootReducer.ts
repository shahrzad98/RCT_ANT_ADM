import { combineReducers } from '@reduxjs/toolkit';

import { authenticationSlice } from '../../modules/authentication';

const rootReducer = () => {
  return combineReducers({
    authentication: authenticationSlice.reducer,
  });
};

export default rootReducer;
