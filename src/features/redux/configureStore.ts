import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import _map from 'lodash/map';
import createSagaMiddleware from 'redux-saga';

import { isProduction } from '../../utils/helpers';
import rootReducer from './rootReducer';
import * as sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer(),
  devTools: !isProduction(),
  middleware: [
    ...getDefaultMiddleware({
      thunk: false /* we don't use thunk */,
      serializableCheck: false /* we pass history object for navigation, so we can't use the warning. But should check other part of the state manually */,
    }),
    sagaMiddleware,
  ],
});

_map(sagas, (saga) => {
  sagaMiddleware.run(saga);
});
