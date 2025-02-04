import { configureStore } from "@reduxjs/toolkit";
import { undoRedoMiddleware } from "./middleware";
import graphReducer from "./slices/graphSlice";
import historyReducer from "./slices/historySlice";
import nodeStylingReducer from "./slices/nodeStylingSlice";
const store = configureStore({
  reducer: {
    graph: graphReducer,
    nodeStyling: nodeStylingReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(undoRedoMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
