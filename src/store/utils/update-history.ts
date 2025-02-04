import { Node, NodePosition, TrackChanges } from "@/utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { pushHistory } from "../slices";

/**
 * A Redux middleware that tracks and records changes made to the graph nodes and edges.
 * Unlike typical middlewares that run for every action, this middleware specifically
 * handles graph-related actions (node positioning, edge management, styling) to maintain
 * a history of user modifications.
 */
export const updateHistory: Middleware = (store) => (next) => (action) => {
  // Execute the action first and store its result
  const result = next(action);

  const { type, payload } = action as PayloadAction<{
    id: string;
    position: NodePosition;
    source: string;
    target: string;
    nodeId: string;
    color: string;
    fontSize: number;
  }>;

  // Get current timestamp for history entry
  const date = new Date().toISOString();

  // Helper function to find node by id in the current graph state
  const findNode = (id: string) =>
    store.getState().graph.graphData.nodes.find((node: Node) => node.id === id);

  // Helper function to dispatch history actions with consistent date
  const addHistory = (historyData: Omit<TrackChanges, "date">) =>
    store.dispatch(pushHistory({ ...historyData, date }));

  // Handle different graph modification actions
  switch (type) {
    case "graph/updateNodePosition": {
      // Track node position changes with x,y coordinates
      const node = findNode(payload.id);

      const { x, y } = payload.position;

      addHistory({
        description: `Changed Node <span class="font-bold">'${node.data.label}'</span> position to <span class="font-bold">(${x.toFixed(2)}, ${y.toFixed(2)})</span>`,
      });
      break;
    }

    case "graph/addEdge": {
      // Track new edge connections between nodes
      const source = findNode(payload.source);

      const target = findNode(payload.target);

      addHistory({
        description: `Connected Node <span class="font-bold">'${target.data.label}'</span> to Node <span class="font-bold">'${source.data.label}'</span>`,
      });
      break;
    }

    case "graph/removeEdge": {
      // Track edge removals
      addHistory({
        description: `Removed connection <span class="font-bold">'${payload}'</span>`,
      });
      break;
    }

    case "nodeStyling/updateNodeTextColor": {
      // Track text color changes
      const { nodeId, color } = payload;

      addHistory({
        type: "textColor",
        nodeName: findNode(nodeId).data.label,
        color,
      });
      break;
    }

    case "nodeStyling/updateNodeBgColor": {
      // Track background color changes
      const { nodeId, color } = payload;

      addHistory({
        type: "backgroundColor",
        nodeName: findNode(nodeId).data.label,
        color,
      });
      break;
    }

    case "nodeStyling/updateNodeFontSize": {
      // Track font size changes
      const { nodeId, fontSize } = payload;

      addHistory({
        description: `Updated Node <span class="font-bold">'${findNode(nodeId).data.label}'</span> text size to <span class="font-bold">${fontSize}px</span>`,
      });
      break;
    }
  }

  return result;
};
