import { GraphState, NodeStylingState } from "@/utils";
import { Action, Middleware } from "@reduxjs/toolkit";
import { pushState } from "./slices/historySlice";

export const TRACKED_ACTIONS = [
  "graph/addEdge",
  "graph/removeEdge",
  "nodeStyling/updateNodeTextColor",
  "nodeStyling/updateNodeBgColor",
  "nodeStyling/updateNodeFontSize",
] as const;

export type TrackedAction = (typeof TRACKED_ACTIONS)[number];

export const historyMiddleware: Middleware<
  object,
  {
    graph: GraphState;
    nodeStyling: NodeStylingState;
  }
> = (store) => (next) => (action) => {
  if (TRACKED_ACTIONS.includes((action as Action).type as TrackedAction)) {
    const currentState = store.getState();
    const historicalState = {
      graph: currentState.graph,
      nodeStyling: currentState.nodeStyling,
    };
    store.dispatch(pushState(historicalState));
  }
  return next(action);
};
