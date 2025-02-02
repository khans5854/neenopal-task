import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./slices/graphSlice";
import historyReducer from "./slices/historySlice";
import nodeStylingReducer from "./slices/nodeStylingSlice";
const store = configureStore({
  reducer: {
    graph: graphReducer,
    history: historyReducer,
    nodeStyling: nodeStylingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
