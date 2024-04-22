import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import rootReducers from "./root-reducer";
import RootSaga from "./root-saga";

const logger = createLogger({ collapsed: true });
const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([logger, sagaMiddleware]),
  devTools: true,
});

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
