import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import thunk from 'redux-thunk';
import data from 'store/reducers/data';
import dataPersist from 'store/reducers/data-persist';
import ModalsReducer from 'app/modals/reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dataPersist'], // elements that will be persisted
  blacklist: ['data'] // elements that will not be persisted
};

const rootReducer = combineReducers({
  data,
  dataPersist,
  ModalsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
