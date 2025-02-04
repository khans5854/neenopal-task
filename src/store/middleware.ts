import {
  createDebounceStateManager,
  DEBOUNCE_DELAY,
  GraphState,
  HistoryState,
  NodeStylingState,
  TrackChanges,
} from "@/utils";
import {
  Action,
  Dispatch,
  Middleware,
  MiddlewareAPI,
  PayloadAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { pushHistory, pushState } from "./slices/historySlice";
import { updateHistory } from "./utils";

// List of Redux actions that should be tracked in the history
export const TRACKED_ACTIONS = ["graph/addEdge", "graph/removeEdge"] as const;

// List of actions that should be debounced in the history
export const DEBOUNCE_TRACKED_ACTIONS = [
  "graph/updateNodePosition",
  "nodeStyling/updateNodeFontSize",
  "nodeStyling/updateNodeTextColor",
  "nodeStyling/updateNodeBgColor",
] as const;

// List of actions that should be tracked in the history
export const UNDO_REDO_ACTIONS = [
  "history/undoState",
  "history/redoState",
] as const;

export type TrackedAction = (typeof TRACKED_ACTIONS)[number];

export type DebounceTrackedAction = (typeof DEBOUNCE_TRACKED_ACTIONS)[number];

export type UndoRedoAction = (typeof UNDO_REDO_ACTIONS)[number];

const stateManager = createDebounceStateManager<{
  graph: GraphState;
  nodeStyling: NodeStylingState;
}>(DEBOUNCE_DELAY);

// Constants for action types
const UNDO_ACTION = "history/undoState";

// Custom error for middleware
class UndoRedoMiddlewareError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UndoRedoMiddlewareError";
  }
}

// Helper function to handle history tracking
const handleHistoryTracking = (
  store: MiddlewareAPI<
    Dispatch<UnknownAction>,
    {
      graph: GraphState;
      nodeStyling: NodeStylingState;
      history: HistoryState;
    }
  >,
  actionType: string,
  lastTrackedAction: TrackChanges,
) => {
  const payload = {
    ...lastTrackedAction,
    date: new Date().toISOString(),
    action: actionType === UNDO_ACTION ? "undo" : "redo",
  };
  store.dispatch(pushHistory(payload));
};

/**
 * Middleware that tracks specific graph and styling changes for undo/redo functionality.
 * When a tracked action occurs, it saves the current state to the history before the action is processed.
 */
export const undoRedoMiddleware: Middleware<
  object,
  {
    graph: GraphState;
    nodeStyling: NodeStylingState;
    history: HistoryState;
  }
> = (store) => (next) => (action) => {
  try {
    const actionType = (action as Action).type;

    // Create snapshot helper function with type safety
    const createStateSnapshot = () => ({
      graph: store.getState().graph,
      nodeStyling: store.getState().nodeStyling,
      payload: (action as PayloadAction<unknown>).payload,
    });

    // Handle tracked actions with early returns for better flow
    if (TRACKED_ACTIONS.includes(actionType as TrackedAction)) {
      const historicalState = createStateSnapshot();
      store.dispatch(pushState(historicalState));
      updateHistory(store)(next)(action);
      return next(action);
    }

    // Handle debounced actions with improved error checking
    if (
      DEBOUNCE_TRACKED_ACTIONS.includes(actionType as DebounceTrackedAction)
    ) {
      const currentState = createStateSnapshot();
      if (!stateManager) {
        throw new UndoRedoMiddlewareError("State manager not initialized");
      }
      stateManager.setInitialState(currentState);
      const result = next(action);
      stateManager.pushDebouncedState(store, () => {
        updateHistory(store)(next)(action);
      });
      return result;
    }

    // Handle undo/redo actions with extracted logic
    if (UNDO_REDO_ACTIONS.includes(actionType as UndoRedoAction)) {
      const result = next(action);
      const lastTrackedAction = store.getState().history.trackChanges.at(-1);
      if (!lastTrackedAction) {
        throw new UndoRedoMiddlewareError("No tracked actions in history");
      }
      handleHistoryTracking(store, actionType, lastTrackedAction);
      return result;
    }

    return next(action);
  } catch (error) {
    console.error(
      "Error in undoRedoMiddleware:",
      error instanceof Error ? error.message : "Unknown error",
    );
    // Still process the action even if history tracking fails
    return next(action);
  }
};
