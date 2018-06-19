import { createStore, applyMiddleware} from 'redux';
import { persistStore, autoRehydrate, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from '../app/reducers/index';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore() {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  return store;
}

/*

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../app/reducers/index';

export default createStore(reducers, applyMiddleware(thunk));

*/
