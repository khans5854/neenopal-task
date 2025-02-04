import {
  GraphState,
  HistoryState,
  NodeStylingState,
  TrackChanges,
} from "@/utils";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: HistoryState = {
  past: [],
  future: [],
  trackChanges: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    // Saves current state to history and clears any future states
    pushState: (
      state,
      action: PayloadAction<{
        graph: GraphState;
        nodeStyling: NodeStylingState;
      }>,
    ) => {
      state.past.push(action.payload);
      state.future = []; // Clear redo stack when new action is performed
    },

    // Moves current state to future and removes last state from past
    undoState: (
      state,
      action: PayloadAction<{
        graph: GraphState;
        nodeStyling: NodeStylingState;
      }>,
    ) => {
      if (state.past.length === 0) return; // Prevent undo if no history exists

      state.future.unshift(action.payload);
      state.past.pop();
    },

    // Moves most recent future state back to past
    redoState: (
      state,
      action: PayloadAction<{
        graph: GraphState;
        nodeStyling: NodeStylingState;
      }>,
    ) => {
      if (state.future.length === 0) return; // Prevent redo if no future states exist

      state.past.push(action.payload);
      state.future.shift();
    },

    // Adds a new track change to the history
    pushHistory: (state, action: PayloadAction<TrackChanges>) => {
      state.trackChanges.push(action.payload);
    },
  },
});

// Actions for history slice
export const { pushState, redoState, undoState, pushHistory } =
  historySlice.actions;

// Selector to get the track changes
export const trackChangesSelector = (state: RootState) =>
  state.history.trackChanges;

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
  (graph, nodeStyling) => ({ graph, nodeStyling }),
);

// selector to get the last state from history
export const getLastState = createSelector(
  [(state: RootState) => state.history.past],
  (past) => (past.length > 0 ? past[past.length - 1] : null),
);

// selector to get the next state from future
export const getNextState = createSelector(
  [(state: RootState) => state.history.future],
  (future) => (future.length > 0 ? future[0] : null),
);

export default historySlice.reducer;
