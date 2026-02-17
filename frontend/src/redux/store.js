import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import companySlice from "./companySlice";
import applicationSlice from "./application";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ['auth']
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  application: applicationSlice
})

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['loading']
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

const finalRootReducer = combineReducers({
  auth: persistedAuthReducer,
  job: jobSlice,
  company: companySlice,
  application: applicationSlice
});

const persistedReducer = persistReducer(persistConfig, finalRootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
