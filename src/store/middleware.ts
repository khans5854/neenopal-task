import { GraphState, NodeStylingState } from "@/utils";
import { Action, Middleware } from "@reduxjs/toolkit";
import { pushState } from "./slices/historySlice";

// List of Redux actions that should be tracked in the history
export const TRACKED_ACTIONS = [
  "graph/addEdge",
  "graph/removeEdge",
  "nodeStyling/updateNodeTextColor",
  "nodeStyling/updateNodeBgColor",
  "nodeStyling/updateNodeFontSize",
] as const;

export type TrackedAction = (typeof TRACKED_ACTIONS)[number];

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
  // Continue processing the action
  return next(action);
};
