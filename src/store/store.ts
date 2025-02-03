import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./slices/graphSlice";
import nodeStylingReducer from "./slices/nodeStylingSlice";
import historyReducer from "./slices/historySlice";
import { historyMiddleware } from "./middleware";
const store = configureStore({
  reducer: {
    graph: graphReducer,
    nodeStyling: nodeStylingReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(historyMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
