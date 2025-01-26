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
    'logout',
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
  devTools: import.meta.env.NODE_ENV !== 'production',
});



sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);
export { store, persistor };
