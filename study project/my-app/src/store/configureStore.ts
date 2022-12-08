import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''], // elements that will be persisted
  blacklist: ['ModalsReducer'] // elements that will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

const persistor = persistStore(store);

export { store, persistor };
