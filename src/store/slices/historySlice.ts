import { GraphState, NodeStylingState } from "@/utils";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface HistoryState {
  past: { graph: GraphState; nodeStyling: NodeStylingState }[];
  future: { graph: GraphState; nodeStyling: NodeStylingState }[];
}

const initialState: HistoryState = {
  past: [],
  future: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    pushState: (
      state,
      action: PayloadAction<{ graph: GraphState; nodeStyling: NodeStylingState }>
    ) => {
      state.past.push(action.payload);
      state.future = []; 
    },

    undoState: (state, action: PayloadAction<{ graph: GraphState; nodeStyling: NodeStylingState }>) => {
      if (state.past.length === 0) return; 

      state.future.unshift(action.payload);
      state.past.pop();
    },

    redoState: (state, action: PayloadAction<{ graph: GraphState; nodeStyling: NodeStylingState }>) => {
      if (state.future.length === 0) return; 

      state.past.push(action.payload); 
      state.future.shift(); 
    },
  },
});

export const { pushState, redoState, undoState } = historySlice.actions;

export const isUndoable = (state: RootState) => state.history.past.length > 0;
export const isRedoable = (state: RootState) => state.history.future.length > 0;

const selectGraph = (state: RootState) => state.graph;
const selectNodeStyling = (state: RootState) => state.nodeStyling;

export const getCurrentState = createSelector(
  [selectGraph, selectNodeStyling],
  (graph, nodeStyling) => ({ graph, nodeStyling })
);

export const getLastState = createSelector(
  [(state: RootState) => state.history.past],
  (past) => past.length > 0 ? past[past.length - 1] : null
);

export const getNextState = createSelector(
  [(state: RootState) => state.history.future],
  (future) => future.length > 0 ? future[0] : null 
);

export default historySlice.reducer;
