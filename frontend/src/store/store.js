import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth', 
    'login', 
    'register',
    'dashboard',
    'accountSettings',
    'salesReport',
    'product',
    'customer',
    'help',
    'transaction'
  ],
  blacklist: ['ui', 'filters']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: typeof window !== 'undefined' && window.location.hostname === 'localhost'
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
