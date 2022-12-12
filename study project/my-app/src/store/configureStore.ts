import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import createSagaMiddleware from 'redux-saga';
import rootSagas from 'sagas';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['GlobalReducer', 'SignInReducer'], // elements that will be persisted
  blacklist: ['ListPageReducer'] // elements that will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

// Create the store with saga middleware
const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...middlewares]
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);

export { store, persistor };
