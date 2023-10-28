import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { authenticatedBase, unAuthenticatedBase } from "./services";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },

    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },

    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "guident-apis",
  storage,
  whitelist: ["Auth", "unAuth"],
};

const rootReducer = combineReducers({
  [unAuthenticatedBase.reducerPath]: unAuthenticatedBase.reducer,
  [authenticatedBase.reducerPath]: authenticatedBase.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([authenticatedBase.middleware, unAuthenticatedBase.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

let persistor = persistStore(store);
export { store, persistor };
