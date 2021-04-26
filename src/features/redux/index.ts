import rootReducer from './rootReducer';

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;
export { initializeStore, store } from './configureStore';
