import {
  createDebounceStateManager,
  DEBOUNCE_DELAY,
  GraphState,
  NodeStylingState,
} from "@/utils";
import { Action, Middleware } from "@reduxjs/toolkit";
import { pushState } from "./slices/historySlice";

// List of Redux actions that should be tracked in the history
export const TRACKED_ACTIONS = [
  "graph/addEdge",
  "graph/removeEdge",
  "nodeStyling/updateNodeTextColor",
  "nodeStyling/updateNodeBgColor",
] as const;

export const DEBOUNCE_TRACKED_ACTIONS = [
  "graph/updateNodePosition",
  "nodeStyling/updateNodeFontSize",
] as const;

export type TrackedAction = (typeof TRACKED_ACTIONS)[number];

export type DebounceTrackedAction = (typeof DEBOUNCE_TRACKED_ACTIONS)[number];

const stateManager = createDebounceStateManager<{
  graph: GraphState;
  nodeStyling: NodeStylingState;
}>(DEBOUNCE_DELAY);

/**
 * Middleware that tracks specific graph and styling changes for undo/redo functionality.
 * When a tracked action occurs, it saves the current state to the history before the action is processed.
 */
export const historyMiddleware: Middleware<
  object,
  {
    graph: GraphState;
    nodeStyling: NodeStylingState;
  }
> = (store) => (next) => (action) => {
  // Check if the current action is one we want to track
  if (TRACKED_ACTIONS.includes((action as Action).type as TrackedAction)) {
    // Get the current state before the action is processed
    const currentState = store.getState();
    // Create a historical snapshot of relevant state slices
    const historicalState = {
      graph: currentState.graph,
      nodeStyling: currentState.nodeStyling,
    };
    // Save the state to history
    store.dispatch(pushState(historicalState));
  }

  // Check if the current action is one we want to debounce
  if (
    DEBOUNCE_TRACKED_ACTIONS.includes(
      (action as Action).type as DebounceTrackedAction,
    )
  ) {
    // Get the current state before the action is processed
    const currentState = store.getState();
    // Store the initial state only if it hasn't been stored yet
    stateManager.setInitialState({
      graph: currentState.graph,
      nodeStyling: currentState.nodeStyling,
    });
    stateManager.pushDebouncedState(store);
  }

  // Continue processing the action
  return next(action);
};
