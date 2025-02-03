import { GraphState, NodeStylingState } from "@/utils";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface HistoryState {
  // Stores previous states for undo functionality
  past: { graph: GraphState; nodeStyling: NodeStylingState }[];
  // Stores states that were undone for redo functionality
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
    // Saves current state to history and clears any future states
    pushState: (
      state,
      action: PayloadAction<{ graph: GraphState; nodeStyling: NodeStylingState }>
    ) => {
      state.past.push(action.payload);
      state.future = []; // Clear redo stack when new action is performed
    },

    // Moves current state to future and removes last state from past
    undoState: (state, action: PayloadAction<{ graph: GraphState; nodeStyling: NodeStylingState }>) => {
      if (state.past.length === 0) return; // Prevent undo if no history exists

      state.future.unshift(action.payload);
      state.past.pop();
    },

    // Moves most recent future state back to past
    redoState: (state, action: PayloadAction<{ graph: GraphState; nodeStyling: NodeStylingState }>) => {
      if (state.future.length === 0) return; // Prevent redo if no future states exist

      state.past.push(action.payload); 
      state.future.shift(); 
    },
  },
});

export const { pushState, redoState, undoState } = historySlice.actions;

// Selector to check if undo operation is available
export const isUndoable = (state: RootState) => state.history.past.length > 0;

// Selector to check if redo operation is available
export const isRedoable = (state: RootState) => state.history.future.length > 0;

// Base selectors for current state
const selectGraph = (state: RootState) => state.graph;
const selectNodeStyling = (state: RootState) => state.nodeStyling;

// selector to get current combined state
export const getCurrentState = createSelector(
  [selectGraph, selectNodeStyling],
  (graph, nodeStyling) => ({ graph, nodeStyling })
);

// selector to get the last state from history
export const getLastState = createSelector(
  [(state: RootState) => state.history.past],
  (past) => past.length > 0 ? past[past.length - 1] : null
);

// selector to get the next state from future
export const getNextState = createSelector(
  [(state: RootState) => state.history.future],
  (future) => future.length > 0 ? future[0] : null 
);

export default historySlice.reducer;
