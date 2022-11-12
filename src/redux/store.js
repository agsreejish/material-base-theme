import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import { rootReducer, rootPersistConfig } from './reducer';

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store =  configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  })
});

const persistor = persistStore(store);

export { store, persistor };