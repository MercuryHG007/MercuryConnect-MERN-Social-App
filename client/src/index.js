import './index.css';
import App from './App';

import React from 'react';
import ReactDOM from 'react-dom/client';
import authReducer from './state'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'; /* REDUX PERSIST is used so as to save the state in the Cache*/
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';  


// REDUX PERSIST CONFIGURATION
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH, 
          REHYDRATE, 
          PAUSE, 
          PERSIST, 
          PURGE, 
          REGISTER
        ],
      },
    }),
});
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider 
      store={store}
    >
      <PersistGate 
        loading={null} 
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);